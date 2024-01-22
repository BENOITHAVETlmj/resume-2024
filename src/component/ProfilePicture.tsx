import { styled } from "styled-components";

const Picture = styled.img`
  border: 0.5rem solid white;
  height: 184px;
  margin: 2em 2em 0 2em;
  @media (max-width: 740px) {
    height: 148px;
  }
`;

export default function ProfilePicture() {
  return <Picture src="/profile_pic.png" alt="profile-picture" />;
}
