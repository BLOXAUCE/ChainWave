import "./App.css";
import Proposals from "./pages/Proposals";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "./theme/theme";
import styled from "styled-components";
import NewProposal from "./pages/NewProposal";
import { useEffect } from "react";
import { initializeContracts } from "./utils/contracts"
import { useErrorStore } from "./store/store";
import ErrorToast from "./components/ErrorToast";

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
  useEffect(() => {
    initializeContracts()
  },[])

  const { errorMessage } = useErrorStore()

  return (
    <>
      <BrowserRouter>
        <AppWrapper>
          {errorMessage !== "" && <ErrorToast />}
          <Header />
          <Routes>
            <Route path="/" element={<Proposals />} />
            <Route path="/create-proposal" element={<NewProposal />} />
          </Routes>
        </AppWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
