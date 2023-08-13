import ChainPrices from "../components/ChainPrices";
import HeroeTexts from "../components/HeroeTexts";
import CardGrid from "../components/CardContainer";
function Proposals() {
  return (
    <>
      <ChainPrices />
      <HeroeTexts
        textMain={"Vote for the proposals that you like or create a new one"}
        subText={"You can vote from any chain that you like"}
      />
      <CardGrid />
    </>
  );
}

export default Proposals;
