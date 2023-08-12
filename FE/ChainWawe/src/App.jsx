import "./App.css";
import Projects from "./pages/Projects";
import Header from "./components/Header";
// import NewProject from "./pages/Work/Work";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./theme/theme";
import styled from "styled-components";

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
  max-width: 85%;
  margin: 0 auto;
  @media screen and (${theme.breakpoints.forTabletLandscapeDown}) {
    max-width: 85%;
  }
  @media screen and (${theme.breakpoints.forPhoneOnly}) {
    max-width: 90%;
  }
`;

function App() {
  return (
    <>
      <BrowserRouter>
        <AppWrapper>
          <Header />
          <Routes>
            <Route path="/" element={<Projects />} />
            {/* <Route path="/newProject" element={<NewProject />} /> */}
          </Routes>
        </AppWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
