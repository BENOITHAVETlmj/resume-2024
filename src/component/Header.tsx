import { styled } from "styled-components";

const Wrapper = styled.div`
  background: white;
  padding: 0 1em;
  display: flex;
  flex-direction: column;
  @media (max-width: 540px) {
    transform: scale(0.6);
    text-align: center;
  }
`;

const Name = styled.h1`
  margin-top: 0;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5px;
  @media (max-width: 540px) {
    text-align: center;
  }
`;

const JobTitle = styled.h3`
  margin-top: 0;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 540px) {
    text-align: center;
  }
`;

const Contact = styled.span`
  font-weight: 700;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 540px) {
    font-size: 10px;
  }
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
