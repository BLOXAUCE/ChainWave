import styled from "styled-components";
import { useState } from "react";

const FormWrapper = styled.div`
  display: flex;
  width: 100%;
  border: 2px solid white;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 40%;
  margin: 2rem;
`;

const StyledLabel = styled.label`
  font-size: clamp(1.5rem, 0.8vw, 1rem);
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  background: transparent;
  color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: clamp(1.5rem, 0.8vw, 1rem);
`;

const StyledSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: clamp(1.5rem, 0.8vw, 1rem);
`;

const StyledButton = styled.button`
  padding: 1rem;
  margin-top: 3rem;
  align-self: center;
  background-color: transparent;
  width: 50%;
  color: white;
  font-size: clamp(1.5rem, 0.8vw, 1rem);
  border: 2px white solid;
  cursor: pointer;
`;

function Form() {
  const [isInfinity, setIsInfinity] = useState(false);

  const handleInfinityChange = (event) => {
    setIsInfinity(event.target.checked);
  };
  return (
    <FormWrapper>
      <StyledForm>
        <StyledLabel>Name of Project</StyledLabel>
        <StyledInput type="text" name="projectName" />

        <StyledLabel>How long should the voting run?</StyledLabel>
        <div>
          <StyledInput
            type="checkbox"
            id="infinityCheckbox"
            name="infinityCheckbox"
            checked={isInfinity}
            onChange={handleInfinityChange}
          />
          <StyledLabel htmlFor="infinityCheckbox">Infinity</StyledLabel>
        </div>
        {!isInfinity && (
          <>
            <StyledInput type="number" name="days" placeholder="Days" />
            <StyledInput type="number" name="hours" placeholder="Hours" />
            <StyledInput type="number" name="seconds" placeholder="Seconds" />
          </>
        )}

        <StyledLabel>Upload Picture</StyledLabel>
        <StyledInput type="file" name="picture" accept="image/*" />

        <StyledLabel>Select Voting Method</StyledLabel>
        <StyledSelect name="votingMethod">
          <option value="method1">Janacek&apos;s method</option>
        </StyledSelect>

        <StyledLabel>Whitelisted addresses</StyledLabel>
        <StyledInput type="file" name="csvFile" accept=".csv" />

        <StyledButton type="submit">Create Project</StyledButton>
      </StyledForm>
    </FormWrapper>
  );
}

export default Form;
