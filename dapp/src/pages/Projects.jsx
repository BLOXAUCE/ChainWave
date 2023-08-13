import ChainPrices from "../components/ChainPrices";
import HeroeTexts from "../components/HeroeTexts";
import CardGrid from "../components/CardContainer";
function Projects() {
  return (
    <>
      <ChainPrices />
      <HeroeTexts
        textMain={"Vote for the project that you like or propose new one"}
        subText={"You can vote from any chain that you like its up to you"}
      />
      <CardGrid />
    </>
  );
}

export default Projects;
