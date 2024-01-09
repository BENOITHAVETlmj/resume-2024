import { styled } from "styled-components";

const Wrapper = styled.div`
  background: #f4dfc8;
  color: #000000;
`;

const ProfilePicture = styled.img`
  border: 0.5rem solid white;
  height: 18%;
  margin: 2em;
  @media (max-width: 740px) {
    height: 12%;
    margin: 1em;
  }
`;

export default function SidePanel() {
  return (
    <Wrapper>
      <ProfilePicture src="/profile_pic.png" alt="profile-picture" />
    </Wrapper>
  );
}
