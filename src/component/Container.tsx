import { styled } from "styled-components";

const Wrapper = styled.div`
  background: white;
  display: flex;
  padding: 10px;
  width: 50%;
  @media (max-width: 1700px) {
    width: 60%;
  }
  @media (max-width: 1540px) {
    width: 65%;
  }
  @media (max-width: 1440px) {
    width: 70%;
  }
  @media (max-width: 1300px) {
    width: 73%;
  }
  @media (max-width: 1020px) {
    width: 77%;
  }
  @media (max-width: 860px) {
    width: 85%;
  }
  @media (max-width: 780px) {
    width: 100%;
  }
`;

interface ContainerProps {
  children: JSX.Element;
}

export default function Container({ children }: ContainerProps) {
  return <Wrapper>{children}</Wrapper>;
}
