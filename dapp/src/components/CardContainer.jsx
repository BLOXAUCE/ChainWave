import styled from "styled-components";
import Card from "./Card";

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const testData = [
  { name: "Medvěd do salámu", time: "2:32:22", method: "Janackova metoda" },
  { name: "Another Card", time: "1:45:30", method: "Different Method" },
  { name: "One More Card", time: "3:15:10", method: "Third Method" },
  { name: "Medvěd do salámu", time: "2:32:22", method: "Janackova metoda" },
  { name: "Another Card", time: "1:45:30", method: "Different Method" },
  { name: "One More Card", time: "3:15:10", method: "Third Method" },
  { name: "Medvěd do salámu", time: "2:32:22", method: "Janackova metoda" },
  { name: "Another Card", time: "1:45:30", method: "Different Method" },
  { name: "One More Card", time: "3:15:10", method: "Third Method" },
  { name: "Medvěd do salámu", time: "2:32:22", method: "Janackova metoda" },
  { name: "Another Card", time: "1:45:30", method: "Different Method" },
  { name: "One More Card", time: "3:15:10", method: "Third Method" },
];

function CardGrid() {
  return (
    <CardsContainer>
      {testData.map((cardData, index) => (
        <Card
          key={index}
          name={cardData.name}
          time={cardData.time}
          method={cardData.method}
        />
      ))}
    </CardsContainer>
  );
}

export default CardGrid;
