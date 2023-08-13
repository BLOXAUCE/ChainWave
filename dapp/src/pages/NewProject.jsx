import Form from "../components/Form";
import HeroeTexts from "../components/HeroeTexts";
function NewProject() {
  return (
    <>
      <HeroeTexts
        textMain={"Propose your new project on xxx chain"}
        subText={"You can propose new project only from xxx chain"}
      />
      <Form />
    </>
  );
}

export default NewProject;
