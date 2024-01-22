import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  &.side-panel {
    max-width: 220px;
  }
  row-gap: 0.3em;
  margin-bottom: 14px;
`;

const Date = styled.span`
  margin-top: 0;
  margin-bottom: 4px;
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 4px;
`;

const SubTitle = styled.span`
  margin-top: 0;
  margin-bottom: 4px;
`;

export const List = styled.ul`
  margin-top: 6px;
  font-size: 12px;
  padding-left: 0;
`;

export const ListElement = styled.li`
  list-style-type: none;
`;

interface SubSectionProps {
  title: string;
  subtitle: string;
  date: string;
  list?: string[];
}

export default function SubSection({
  title,
  date,
  list,
  subtitle,
}: SubSectionProps) {
  return (
    <Wrapper>
      <Date>{date}</Date>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
      {list && (
        <List>
          {list.map((e: string) => (
            <ListElement key={e}>- {e}</ListElement>
          ))}
        </List>
      )}
    </Wrapper>
  );
}
