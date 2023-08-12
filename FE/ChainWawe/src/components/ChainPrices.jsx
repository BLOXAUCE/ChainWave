import styled from "styled-components";
import mumbai from "../assets/mumbai.png";
const ChainWrapper = styled.div`
  display: flex;
  gap: 5rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ChainItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: clamp(1.4rem, 0.8vw, 1.6rem);

  align-items: center;
`;

const ChainImage = styled.img`
  width: 45px;
`;

function ChainPrices() {
  return (
    <ChainWrapper>
      <ChainItem>
        Mumbai
        <ChainImage src={mumbai} />
        15 gwei
      </ChainItem>
      <ChainItem>
        Mumbai
        <ChainImage src={mumbai} />
        15 gwei
      </ChainItem>
      <ChainItem>
        Mumbai
        <ChainImage src={mumbai} />
        15 gwei
      </ChainItem>
      <ChainItem>
        Mumbai
        <ChainImage src={mumbai} />
        15 gwei
      </ChainItem>
    </ChainWrapper>
  );
}

export default ChainPrices;
