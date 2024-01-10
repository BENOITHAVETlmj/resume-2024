import { styled } from "styled-components";

const Wrapper = styled.div`
  background: white;
  display: flex;
  padding: 10px;
  max-width: 80%;
`;

interface ContainerProps {
  children: JSX.Element;
}

export default function Container({ children }: ContainerProps) {
  return <Wrapper>{children}</Wrapper>;
}
