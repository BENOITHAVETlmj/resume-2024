import { styled } from "styled-components";

const Wrapper = styled.div`
  background: white;
  padding: 0 1em;
  display: flex;
  flex-direction: column;
`;

const Name = styled.h1`
  margin-top: 0;
  display: flex;
`;

const JobTitle = styled.h3`
  margin-top: 0;
  display: flex;
`;

const Contact = styled.span``;

interface HeaderProps {
  lastName?: string;
  firstName?: string;
  jobTitle?: string;
  phone?: string;
  mail?: string;
  adress?: string;
}

export default function Header({
  lastName,
  firstName,
  jobTitle,
  phone,
  mail,
  adress,
}: HeaderProps) {
  return (
    <Wrapper>
      <Name>
        {lastName} {firstName}
      </Name>
      <JobTitle>{jobTitle}</JobTitle>
      <Contact>{phone}</Contact>
      <Contact>{mail}</Contact>
      <Contact>{adress}</Contact>
    </Wrapper>
  );
}
