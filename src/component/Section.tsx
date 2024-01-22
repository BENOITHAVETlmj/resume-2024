import { styled } from "styled-components";
import classnames from "classnames";
import React from "react";

const Wrapper = styled.div`
  padding: 0 2em;
  &.side-panel {
    max-width: 220px;
  }
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 4px;
`;

const Content = styled.div`
  margin-top: 6px;
  font-size: 12px;
`;

const Separator = styled.div`
  margin: 18px 0;
  border: solid 1px black;
`;

interface SectionProps {
  title: string;
  content?: string | JSX.Element;
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
