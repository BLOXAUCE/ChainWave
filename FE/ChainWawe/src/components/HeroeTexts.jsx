import styled from "styled-components";

const TextWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
`;

const TextMain = styled.span`
  font-size: clamp(2rem, 0.8vw, 1.6rem);
`;

const SubText = styled(TextMain)`
  font-size: clamp(1.4rem, 0.8vw, 1rem);
`;

function HeroeTexts() {
  return (
    <TextWrapper>
      <TextMain>Vote for the project that you like or propose new one</TextMain>
      <SubText>You can vote from any chain that you like its up to you</SubText>
    </TextWrapper>
  );
}

export default HeroeTexts;
