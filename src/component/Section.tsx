import { styled } from "styled-components";
import classnames from "classnames";

const Wrapper = styled.div`
  padding: 0 2em;
  &.side-panel {
    max-width: 220px;
  }
  @media (max-width: 540px) {
    padding: 0 1em;
  }
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 4px;
  color: #7e4e2c;
  font-weight: 800;
`;

const Content = styled.div`
  margin-top: 6px;
  font-size: 12px;
`;

const Separator = styled.div`
  margin: 18px 0;
  border: solid 1px #7e4e2c;
`;

interface SectionProps {
  title: string;
  content?: JSX.Element[] | string;
  list?: JSX.Element;
  isFullWidth?: boolean;
}

export default function Section({
  title,
  content,
  list,
  isFullWidth = true,
}: SectionProps) {
  return (
    <Wrapper className={classnames({ "side-panel": !isFullWidth })}>
      <Separator />
      <Title>{title}</Title>
      {content && <Content>{content}</Content>}
      {list && <Content>{list}</Content>}
    </Wrapper>
  );
}
