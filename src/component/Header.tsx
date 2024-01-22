import { styled } from "styled-components";

const Wrapper = styled.div`
  background: white;
  padding: 0 2em;
  display: flex;
  flex-direction: column;
`;

const Name = styled.h1`
  margin-top: 0;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5px;
`;

const JobTitle = styled.h3`
  margin-top: 0;
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;

const Contact = styled.span`
  font-weight: 700;
  margin-left: auto;
  margin-right: auto;
`;

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
