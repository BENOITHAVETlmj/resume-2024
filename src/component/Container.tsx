import { styled } from "styled-components";
import Header from "./Header";
import SidePanel from "./SidePanel";

const Wrapper = styled.div`
  background: white;
  display: flex;
  padding: 10px;
  max-width: 80%;
`;


export default function Container() {
    return (
      <Wrapper>
       <SidePanel />
       <Header />
      </Wrapper>
    );
  }