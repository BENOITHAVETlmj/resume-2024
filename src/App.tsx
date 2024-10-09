import { styled } from "styled-components";
import Container from "./component/Container";
import { motion } from "framer-motion";
import Header from "./component/Header";
import SidePanel from "./component/SidePanel";
import ProfilePicture from "./component/ProfilePicture";
import { Suspense, useEffect, useState } from "react";
import Section from "./component/Section";
import SubSection, { List, ListElement } from "./component/SubSection";
import { Background, Career, Data, LanguageSkill } from "./types/global";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LoadingWrapper = styled.div`
  height: 100vh;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: #333;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #2d545e;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  margin: 10px;
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #12343b;
  }
`;

function App() {
  const [data, setData] = useState<any | undefined>();
  const [errorMessage, setErrorMessage] = useState("");
  const [languageVersion, setLanguageVersion] = useState<"en" | "fr">("fr");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/cv_${languageVersion}.json`);
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
  }, [languageVersion, errorMessage]);

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
    return careerPath?.map((xp: Career, index: number) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 100, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{
          duration: 0.7,
          delay: index * 0.3,
          ease: "easeInOut",
        }}
      >
        <SubSection
          key={xp.startDate}
          title={xp.company}
          subtitle={xp.title}
          date={`${xp.startDate} - ${xp.endDate}`}
          list={xp.tasks}
        />
      </motion.div>
    ));
  };

  const backgroundList = () => {
    return background?.map((e: Background, index: number) => (
      <motion.div
        key={e.startDate}
        initial={{ opacity: 0, x: 100, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{
          duration: 0.7,
          delay: index * 0.3,
          ease: "easeInOut",
        }}
      >
        <SubSection
          title={e.company}
          subtitle={e.degree?.[0]}
          date={`${e.startDate} - ${e.endDate}`}
        />
      </motion.div>
    ));
  };

  const languageList = () => {
    return language?.map((e: LanguageSkill, index: number) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 100, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{
          duration: 0.7,
          delay: index * 0.3,
          ease: "easeInOut",
        }}
      >
        <SubSection key={e.language} title={e.language} subtitle={e.level} />
      </motion.div>
    ));
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [data]);

  if (isLoading) {
    return (
      <>
        <ButtonWrapper>
          <Button disabled>Go to Github</Button>
          <Button disabled>
            {languageVersion === "en"
              ? "Switch to French"
              : "Switch to English"}
          </Button>
        </ButtonWrapper>
        <LoadingWrapper>
          <DotLottieReact
            src="https://lottie.host/83e5bcd7-52ba-4298-87f7-5e5b161c19e7/ML7QvrHEFu.json"
            loop
            autoplay
          />
        </LoadingWrapper>
      </>
    );
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ButtonWrapper>
        <Button
          onClick={() =>
            window.open(
              "https://github.com/BENOITHAVETlmj/resume-2024",
              "_blank"
            )
          }
        >
          Go to Github
        </Button>
        <Button
          onClick={() =>
            setLanguageVersion(languageVersion === "en" ? "fr" : "en")
          }
        >
          {languageVersion === "en" ? "Switch to French" : "Switch to English"}
        </Button>
      </ButtonWrapper>
      <Wrapper className="App">
        <Container>
          <>
            <SidePanel>
              <>
                <ProfilePicture />
                <Section
                  title={
                    languageVersion === "fr"
                      ? "Profil professionnel"
                      : "Professional Profile"
                  }
                  content={personalInfos?.description}
                  isFullWidth={false}
                />
                <Section
                  title={languageVersion === "fr" ? "Compétences" : "skills"}
                  list={skills()}
                  isFullWidth={false}
                />
                <Section
                  title={
                    languageVersion === "fr" ? "Centres d'intérês" : "Interests"
                  }
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
                title={
                  languageVersion === "fr"
                    ? "Parcours professionnel"
                    : "Career path"
                }
                content={careerPathList()}
              />
              <Section
                title={languageVersion === "fr" ? "Formation" : "Education"}
                content={backgroundList()}
              />
              <Section
                title={languageVersion === "fr" ? "Langues" : "Languages"}
                content={languageList()}
              />
            </RightSide>
          </>
        </Container>
      </Wrapper>
    </Suspense>
  );
}

export default App;
