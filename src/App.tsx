import { styled } from "styled-components";
import Container from "./component/Container";
import Header from "./component/Header";
import SidePanel from "./component/SidePanel";
import ProfilePicture from "./component/ProfilePicture";
import { Suspense, useEffect, useRef, useState } from "react";
import Section from "./component/Section";
import SubSection, { List, ListElement } from "./component/SubSection";
import { Background, Career, Data, LanguageSkill } from "./types/global";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import classNames from "classnames";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  filter: blur(6em);
  opacity: 0.6;
  transition: filter 0.5s ease-out, opacity 0.5s ease-out;
  &.--unblur {
    filter: blur(0);
    opacity: 1;
  }
  padding-bottom: 100px;
`;

const Buffer = styled.div`
  height: 70vh;
  filter: blur(6em);
  opacity: 0.6;
  transition: filter 0.5s ease-out, opacity 0.5s ease-out;
  &.--unblur {
    filter: blur(0);
    opacity: 1;
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function App() {
  const [data, setData] = useState<any | undefined>();
  const [errorMessage, setErrorMessage] = useState("");
  const ref = useRef(null);

  const [isBlured, setIsBlured] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/cv.json");

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const result = await response.json();

        setData(result);
      } catch (error) {
        setErrorMessage(`Request error :` + error);
        console.log(errorMessage);
      }
    };
    fetchData();
  }, [errorMessage]);

  const personalInfos: Data["profile"]["personalInfos"] =
    data?.data.profile.personalInfos;
  const careerPath: Career[] = data?.data?.profile?.careerPath;
  const background: Background[] = data?.data?.profile?.background;
  const language: LanguageSkill[] = data?.data?.profile?.languageSkills;

  const skills = () => {
    return (
      <List>
        {data?.data?.profile?.skills.map((skill: string) => (
          <ListElement key={skill}>{skill}</ListElement>
        ))}
      </List>
    );
  };

  const interests = () => {
    return (
      <List>
        {data?.data?.profile?.interests.map((interest: string) => (
          <ListElement key={interest}>{interest}</ListElement>
        ))}
      </List>
    );
  };

  const careerPathList = () => {
    return careerPath?.map((xp: Career) => (
      <SubSection
        key={xp.startDate}
        title={xp.company}
        subtitle={xp.title}
        date={`${xp.startDate} - ${xp.endDate}`}
        list={xp.tasks}
      />
    ));
  };

  const backgroundList = () => {
    return background?.map((e: Background) => (
      <SubSection
        key={e.startDate}
        title={e.company}
        subtitle={e.degree?.[0]}
        date={`${e.startDate} - ${e.endDate}`}
      />
    ));
  };

  const languageList = () => {
    return language?.map((e: LanguageSkill) => (
      <SubSection key={e.language} title={e.language} subtitle={e.level} />
    ));
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    latest > 0.5 && setIsBlured(true);
    latest < 0.5 && setIsBlured(false);
  });

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Buffer
        className={classNames({
          "--unblur": isBlured,
        })}
      />
      <Wrapper
        as={motion.div}
        className={classNames("App", {
          "--unblur": isBlured,
        })}
        ref={ref}
        style={{ opacity: scrollYProgress }}
      >
        <Container>
          <>
            <SidePanel
              className={classNames("App", {
                "--unblur": isBlured,
              })}
            >
              <>
                <ProfilePicture />
                <Section
                  title="Profil professionnel"
                  content={personalInfos?.description}
                  isFullWidth={false}
                />
                <Section
                  title="Compétences"
                  list={skills()}
                  isFullWidth={false}
                />
                <Section
                  title="Centres d'intérês"
                  list={interests()}
                  isFullWidth={false}
                />
              </>
            </SidePanel>
            <RightSide>
              <Header
                lastName={personalInfos?.lastName}
                firstName={personalInfos?.firstName}
                jobTitle={personalInfos?.jobTitle}
                phone={personalInfos?.phone}
                mail={personalInfos?.mail}
                adress={personalInfos?.adress}
              />
              <Section
                title="Parcours professionnel"
                content={careerPathList()}
              />
              <Section title="Formation" content={backgroundList()} />
              <Section title="Langues" content={languageList()} />
            </RightSide>
          </>
        </Container>
      </Wrapper>
    </Suspense>
  );
}

export default App;
