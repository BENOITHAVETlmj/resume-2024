import { styled } from "styled-components";
import Container from "./component/Container";
import Header from "./component/Header";
import SidePanel from "./component/SidePanel";
import ProfilePicture from "./component/ProfilePicture";
import { Suspense, useEffect, useState } from "react";
import Section from "./component/Section";

const Wrapper = styled.div`
  height: 100vh;
  background: #f4eae0;
  display: flex;
  justify-content: center;
`;

function App() {
  const [data, setData] = useState<any | undefined>();
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/cv.json");

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const result = await response.json();

        setData(result);
        console.log(result);
      } catch (error) {
        setError(`Erreur lors de la requête :`);
      }
    };

    fetchData();
  }, []);

  const personalInfos = data?.data.profile.personalInfos;

  const skills = () => {
    return (
      <ul>
        {data?.data?.profile?.skills.map((skill: string) => (
          <li>{skill}</li>
        ))}
      </ul>
    );
  };
  console.log({ skills });

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
                />
                <Section title="Compétences" list={skills} />
              </>
            </SidePanel>
            <Header
              lastName={personalInfos?.lastName}
              firstName={personalInfos?.firstName}
              jobTitle={personalInfos?.jobTitle}
              phone={personalInfos?.phone}
              mail={personalInfos?.mail}
              adress={personalInfos?.adress}
            />
          </>
        </Container>
      </Wrapper>
    </Suspense>
  );
}

export default App;
