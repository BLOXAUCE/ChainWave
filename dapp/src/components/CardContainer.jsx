import styled from "styled-components";
import Card from "./Card";
import useListProposals from "../hooks/useListProposals"; // Update the path to your hook
import { Methods } from "../utils/methods";
import { formatDate } from "../utils/timeConverter";
import { ProjectName, ProjectPhoto } from "../utils/utils";

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

function CardGrid() {
  const [loading, listAddress] = useListProposals();

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <CardsContainer>
      {listAddress.map((cardData, index) => (
        <Card
          key={index}
          id={cardData.VotingExecutor_id}
          name={ProjectName[cardData.VotingExecutor_id]}
          img={ProjectPhoto[cardData.VotingExecutor_id]}
          time={formatDate(cardData.deadline)}
          optionsLength={cardData.optionsLength}
          method={Methods[cardData.format]}
        />
      ))}
    </CardsContainer>
  );
}

export default CardGrid;
