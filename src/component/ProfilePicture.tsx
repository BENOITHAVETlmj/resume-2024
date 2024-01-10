import { styled } from "styled-components";

const Picture = styled.img`
  border: 0.5rem solid white;
  height: 18%;
  margin: 2em;
  @media (max-width: 740px) {
    height: 12%;
    margin: 1em;
  }
`;

export default function ProfilePicture() {
  return <Picture src="/profile_pic.png" alt="profile-picture" />;
}
