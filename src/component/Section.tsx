import { styled } from "styled-components";

const Wrapper = styled.div`
  padding: 0 1em;
  max-width: 220px;
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
  content?: string;
  list?: any;
}

export default function Section({ title, content, list }: SectionProps) {
  return (
    <Wrapper>
      <Separator />
      <Title>{title}</Title>
      {content && <Content>{content}</Content>}
      {list && <Content>{list}</Content>}
    </Wrapper>
  );
}
