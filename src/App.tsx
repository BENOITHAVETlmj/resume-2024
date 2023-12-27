import { styled } from "styled-components";
import Container from "./component/Container";

const Wrapper = styled.div`
  height: 100vh;
  background: #F4EAE0;
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <Wrapper className="App">
     <Container />
    </Wrapper>
  );
}

export default App;
