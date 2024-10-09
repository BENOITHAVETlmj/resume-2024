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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [data]);

  if (isLoading) {
    return (
      <LoadingWrapper>
        <iframe
          src="https://giphy.com/embed/3o7Zen3RCzrnhHnSkU"
          width="480"
          height="480"
          className="giphy-embed"
          allowFullScreen
        />
      </LoadingWrapper>
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
