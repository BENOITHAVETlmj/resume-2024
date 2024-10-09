import { styled } from "styled-components";

const Wrapper = styled.div`
  color: #000000;
`;

interface SidePanelProps {
  children: JSX.Element;
}

export default function SidePanel({ children }: SidePanelProps) {
  return <Wrapper>{children}</Wrapper>;
}
