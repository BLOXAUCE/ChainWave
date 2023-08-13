import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { useErrorStore } from "../store/store";
import theme from "../theme/theme";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 30px;
  left: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #000;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  z-index: 10000001;
  margin-right: 20px;
  font-family: ${theme.fonts.lato};
  animation: ${fadeIn} 0.15s ease-in-out;

  @media screen and (max-width: 768px) {
    margin-right: 0;
    right: 20px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ErrorToast = () => {
  const { errorMessage, setErrorMessage } = useErrorStore();

  const [link, setLink] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (Array.isArray(errorMessage)) {
      setMessage(errorMessage[0])
      setLink(errorMessage[1])
    }
  }, [errorMessage, setLink]);

  return (
    <ToastContainer>
      {link && message ? (
        <p>
        <a style={{color:"white"}} href={link} target="_blank" rel="noopener noreferrer">
          {message}
        </a>
        </p>
      ) : (
        <p>{errorMessage}</p>
      )}
      <CloseButton
        onClick={() => setErrorMessage("")}
      >
        ✕
      </CloseButton>
    </ToastContainer>
  );
};

export default ErrorToast;
