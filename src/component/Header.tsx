import { styled } from "styled-components";

const Wrapper = styled.div`
  background: white;
  padding: 0 0.5em;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-top: 0; 
`;

const Text = styled.span` 
`;


export default function Header() {
    return (
      <Wrapper>
       <Title>Title</Title>
       <Text>JOB positionOB positionOB positionOB positiOB positionOB positionOB positionOB positiononOB positionOB positionOB positionOB positionOB positionOB positionOB positionOB positionOB positionOB positionOB positionOB positionOB positionOB position</Text>

      </Wrapper>
    );
  }