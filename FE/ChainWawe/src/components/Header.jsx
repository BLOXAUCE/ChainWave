import styled from "styled-components";
import theme from "../theme/theme";
import { useNavigate } from "react-router";

const HeaderWrapper = styled.div`
  display: flex;
  position: relative;
  gap: 5rem;
  width: 100%;
  top: 3%;
  padding: 0.6rem 0.6rem;
  z-index: 5;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media screen and (${theme.breakpoints.forPhoneOnly}) {
    gap: 0rem;
  }
`;

const HeaderItem = styled.div`
  position: relative;
  display: flex;
  font-size: clamp(1.7rem, 1vw, 2rem);
  z-index: 2;
  padding: 0.5rem 1rem;
  font-weight: 400;
  color: white;
  cursor: pointer;
  background: transparent;
  line-height: 2.6vh;
  font-family: ${theme.fonts.lato};
`;

const HeaderItemLogin = styled(HeaderItem)`
  border: 1px solid white;
`;

function Header() {
  const navigate = useNavigate();
  return (
    <>
      <HeaderWrapper>
        <HeaderItem onClick={() => navigate("/")}>All projects</HeaderItem>
        <HeaderItem onClick={() => navigate("/newProject")}>
          New project
        </HeaderItem>
        <HeaderItemLogin>Login</HeaderItemLogin>
      </HeaderWrapper>
    </>
  );
}

export default Header;
