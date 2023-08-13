import Form from "../components/Form";
import HeroeTexts from "../components/HeroeTexts";

function NewProposal() {
  return (
    <>
      <HeroeTexts
        textMain={"Propose your idea on Fantom chain"}
        subText={"You can propose only on Fantom chain. People can vote from any chain."}
      />
      <Form />
    </>
  );
}

export default NewProposal;
