import { styled } from "styled-components";

const Wrapper = styled.div`
  background: #f4dfc8;
  color: #000000;
  border-radius: 20px;
`;

interface SidePanelProps {
  children: JSX.Element;
  className?: string;
}

export default function SidePanel({ children, className }: SidePanelProps) {
  return <Wrapper className={className}>{children}</Wrapper>;
}
