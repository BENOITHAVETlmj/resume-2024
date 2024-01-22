import { styled } from "styled-components";
import Container from "./component/Container";
import Header from "./component/Header";
import SidePanel from "./component/SidePanel";
import ProfilePicture from "./component/ProfilePicture";
import { Suspense, useEffect, useState } from "react";
import Section from "./component/Section";
import SubSection from "./component/SubSection";

const Wrapper = styled.div`
  height: 100vh;
  background: #f4eae0;
  display: flex;
  justify-content: center;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

function App() {
  const [data, setData] = useState<any | undefined>();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/cv.json");

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const result = await response.json();

        setData(result);
      } catch (error) {
        setErrorMessage(`Erreur lors de la requête :` + error);
        console.log(errorMessage);
      }
    };
    fetchData();
  }, [errorMessage]);

  const personalInfos = data?.data.profile.personalInfos;

  const careerPath = data?.data?.profile?.careerPath;

  const skills = () => {
    return (
      <ul>
        {data?.data?.profile?.skills.map((skill: string) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    );
  };

  const careerPathList = () => {
    return careerPath?.map((xp: any) => (
      <SubSection
        key={xp.startDate}
        title={xp.company}
        subtitle={xp.title}
        date={`${xp.startDate} - ${xp.endDate}`}
        list={xp.tasks}
      />
    ));
  };

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
                title="Profil professionnel"
                content={careerPathList()}
              />
            </RightSide>
          </>
        </Container>
      </Wrapper>
    </Suspense>
  );
}

export default App;
