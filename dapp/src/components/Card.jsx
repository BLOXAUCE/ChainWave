/* eslint-disable react/prop-types */
import styled from "styled-components";
import Image from "../assets/placeholderImage.png";
import { useState } from "react";
import Modal from "./Modal";
const CardWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding-bottom: 1.5rem;
  flex-direction: column;
  align-items: center;
  border: 2px solid white;
  justify-content: space-between;
`;

const CardImage = styled.img`
  object-fit: cover;
`;

const CardDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const CardName = styled.span`
  font-size: clamp(1rem, 0.6vw, 0.8rem);
  font-weight: 700;
`;

const CardDescText = styled.span`
  font-size: clamp(1.3rem, 0.6vw, 1rem);
`;

const CardDescValueText = styled.span`
  font-size: clamp(1rem, 0.6vw, 1rem);
`;

const Card = ({ name, time, method }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <CardWrapper onClick={openModal}>
        <CardImage src={Image} />
        <CardDescription>
          <CardName>{name}</CardName>
          <CardDescText>Time remaining</CardDescText>
          <CardDescValueText>{time}</CardDescValueText>
          <CardDescText>Voting method</CardDescText>
          <CardDescValueText>{method}</CardDescValueText>
        </CardDescription>
      </CardWrapper>
      {isModalOpen && (
        <Modal>
          {/* Render your modal content here */}
          <button onClick={closeModal}>Close Modal</button>
        </Modal>
      )}
    </>
  );
};

export default Card;
