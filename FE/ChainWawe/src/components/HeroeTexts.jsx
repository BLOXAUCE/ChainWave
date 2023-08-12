/* eslint-disable react/prop-types */
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

const HeroeTexts = ({ textMain, subText }) => {
  return (
    <TextWrapper>
      <TextMain>{textMain}</TextMain>
      <SubText>{subText}</SubText>
    </TextWrapper>
  );
};

export default HeroeTexts;
