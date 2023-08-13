/* eslint-disable react-hooks/rules-of-hooks */
import styled from "styled-components";
import { useState } from "react";
import Modal from "./Modal";
import useItemCountVotes from "../hooks/useItemCountVotes"; // Update the path to your hook
import { ProjectItems } from "../utils/mockData";
import { useBlockchainStore, useErrorStore } from "../store/store"
import {contractExecutorFantom, getLzEndpointContract, getSenderContract} from "../utils/contracts"
import { ethers } from "ethers";

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
  width: 250px;
  height: 250px;
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

const StyledModalItem = styled.div`
  font-size: clamp(1rem, 0.6vw, 1rem);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1rem;
  padding-top: 0.5rem;
  width: 100%;
  border: 1px white solid;
  background: transparent;
`;

const StyledButtonModal = styled.button`
  font-size: clamp(1rem, 0.6vw, 1rem);
  border: 1px white solid;
  width: 40px;
  cursor: pointer;
  background: transparent;
  color: white;
`;

const ButtonAndVoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const CloseModalButton = styled.button`
  background: none;
  font-size: clamp(1rem, 0.6vw, 1rem);
  color: white;
  border: 2px white solid;
  margin-top: 2rem;
`;

/* eslint-disable react/prop-types */
const Card = ({ name, time, method, img, optionsLength, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [handlingTx, setHandlingTx] = useState(false);
  
  const { walletConnected, network, address } = useBlockchainStore()
  const { setErrorMessage} = useErrorStore()

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function handle(vote, optionId) {
    if (!walletConnected) {
      setErrorMessage("Please, connect your wallet first.")
      return
    }
    setHandlingTx(true)

    const numberOfVotes = await contractExecutorFantom.getAddressVotesForProposal(Number(id), address)
    if (vote) {
      // TODO other voting formats
      if (numberOfVotes[0] >= 2) {
        setErrorMessage("You've already distributed your positive votes.")
        setHandlingTx(false)
        return
      }
    } else {
      if (numberOfVotes[0] !== 2) {
        setErrorMessage("You must first vote both positive votes before voting negative.")
        setHandlingTx(false)
        return
      } else if (numberOfVotes[1] === 1) {
        setErrorMessage("You've already distributed your negative vote.")
        setHandlingTx(false)
        return
      }
    }

    // TODO handle deadline

    // TODO handle voting from Executor chain (fantom)
    const senderContract = getSenderContract(network)
    const endpointContract = getLzEndpointContract(network)
    const adapterParams = ethers.utils.solidityPack(["uint16", "uint256"], [1, 900000]);
    const fees = await endpointContract.estimateFees(10112, address, "0x", false, adapterParams)

    try {
      setErrorMessage("Please, confirm the transaction to vote for proposal.")
      const tx = await senderContract.sendVote(Number(id), Number(optionId), vote, [], { value: fees[0] })
      const receipt = tx.wait()
      console.log(receipt)
      setErrorMessage("Thank you. Successfully voted. Please wait a few minutes until your vote is reflected in the dashboard.")
      setHandlingTx(false)
    } catch (error) {
      setErrorMessage("You must confirm the transaction.")
      setHandlingTx(false)
    }
  }

  /// based on id choose items in it, the name
  const divs = [];
  for (let i = 0; i < optionsLength; i++) {
    divs.push(
      <StyledModalItem key={i}>
        {ProjectItems[id] && ProjectItems[id][i] ? ProjectItems[id][i] : "Placeholder Option"}
        <ButtonAndVoteWrapper>
          <ButtonWrapper>
            {useItemCountVotes(id, i.toString(), true)}
            <StyledButtonModal disabled={handlingTx} onClick={() => handle(true, i)}>+</StyledButtonModal>{" "}
            <StyledButtonModal disabled={handlingTx} onClick={() => handle(false, i)}>-</StyledButtonModal>
            {useItemCountVotes(id, i.toString(), false)}
          </ButtonWrapper>
        </ButtonAndVoteWrapper>
      </StyledModalItem>
    );
  }
  return (
    <>
      <CardWrapper onClick={openModal}>
        <CardImage src={img} />
        <CardDescription>
          <CardName>{name}</CardName>
          <CardDescText>Voting deadline</CardDescText>
          <CardDescValueText>{time}</CardDescValueText>
          <CardDescText>Voting format</CardDescText>
          <CardDescValueText>{method}</CardDescValueText>
        </CardDescription>
      </CardWrapper>
      {isModalOpen && (
        <Modal>
          {divs}
          <CloseModalButton onClick={closeModal}>Close Modal</CloseModalButton>
        </Modal>
      )}
    </>
  );
};

export default Card;
