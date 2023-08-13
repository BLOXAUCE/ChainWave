import styled from "styled-components";
import theme from "../theme/theme";
const FormWrapper = styled.div`
  display: flex;
  width: 80%;
  border: 2px solid white;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  @media screen and (${theme.breakpoints.forTabletLandscapeDown}) {
    width: 100%;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 70%;
  margin: 2rem;
  @media screen and (${theme.breakpoints.forTabletLandscapeDown}) {
    max-width: 90%;
  }
`;

const StyledLabel = styled.label`
  font-size: clamp(1.3rem, 0.8vw, 0.5rem);
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  background: transparent;
  color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: clamp(1.3rem, 0.8vw, 0.5rem);
`;

const StyledSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: clamp(1.3rem, 0.8vw, 0.5rem);
`;

const StyledButton = styled.button`
  padding: 1rem;
  margin-top: 3rem;
  align-self: center;
  background-color: transparent;
  width: 50%;
  color: white;
  font-size: clamp(1.3rem, 0.8vw, 0.5rem);
  border: 2px white solid;
  cursor: pointer;
  @media screen and (${theme.breakpoints.forTabletLandscapeDown}) {
    width: 90%;
  }
`;

function Form() {
  return (
    <FormWrapper>
      <StyledForm>
        <StyledLabel>Name of Project</StyledLabel>
        <StyledInput type="text" name="projectName" />

        <StyledLabel>
          Select voting end (leave empty for never-ending proposal)
        </StyledLabel>
        <StyledInput type="date" name="dateEnd" />

        <StyledLabel>Upload Picture</StyledLabel>
        <StyledInput type="file" name="picture" accept="image/*" />

        <StyledLabel>Select Voting Method</StyledLabel>
        <StyledSelect name="votingMethod">
          <option value="method1">D21 – Janecek method</option>
        </StyledSelect>

        <StyledLabel>Voter addresses (leave empty for public)</StyledLabel>
        <StyledInput type="file" name="csvFile" accept=".csv" />

        <StyledButton type="submit">Create Project</StyledButton>
      </StyledForm>
    </FormWrapper>
  );
}

export default Form;
