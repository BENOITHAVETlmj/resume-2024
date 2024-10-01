import { styled } from "styled-components";
import Container from "./component/Container";
import Header from "./component/Header";
import SidePanel from "./component/SidePanel";
import ProfilePicture from "./component/ProfilePicture";
import { Suspense, useEffect, useState } from "react";
import Section from "./component/Section";
import SubSection, { List, ListElement } from "./component/SubSection";
import { Background, Career, Data, LanguageSkill } from "./types/global";

const Wrapper = styled.div`
  height: 100%;
  background: #f4dfc8;
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
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4eae0;
  font-size: 2rem;
  color: #333;
`;

function App() {
  const [data, setData] = useState<any | undefined>();
  const [errorMessage, setErrorMessage] = useState("");

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

  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Set a 3-second timeout to display the loading message
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <LoadingWrapper>
        <iframe
          src="https://giphy.com/embed/3o7Zen3RCzrnhHnSkU"
          width="480"
          height="480"
          className="giphy-embed"
          allowFullScreen
        ></iframe>
      </LoadingWrapper>
    );
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Wrapper className="App">
        <Container>
          <>
            <SidePanel>
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
