import styled from "styled-components"
import theme from "../theme/theme"
import { metamaskSwitchAndAddChain } from "../utils/wallet"
import { Chain, Chains } from "../utils/chains"
import { useBlockchainStore, useErrorStore } from "../store/store"
import { useState } from "react"
import { getExecutorContract } from "../utils/contracts"

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
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 70%;
  margin: 2rem;
  @media screen and (${theme.breakpoints.forTabletLandscapeDown}) {
    max-width: 90%;
  }
`

const StyledLabel = styled.label`
  font-size: clamp(1.3rem, 0.8vw, 0.5rem);
`

const StyledInput = styled.input`
  padding: 0.5rem;
  background: transparent;
  color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: clamp(1.3rem, 0.8vw, 0.5rem);
`

const StyledSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: clamp(1.3rem, 0.8vw, 0.5rem);
`

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
`

function Form() {
  const { setErrorMessage } = useErrorStore()
  const { walletConnected } = useBlockchainStore()
  const [handlingTx, setHandlingTx] = useState(false)
  const [numberOfChoices, setNumberOfChoices] = useState(1)
  const inputsArray = Array.from({ length: numberOfChoices }, (_, index) => index)

  async function handle(event) {
    event.preventDefault()
    if (!walletConnected) {
      setErrorMessage("Please, connect your wallet first.")
      return
    }

    setHandlingTx(true)

    const switched = await metamaskSwitchAndAddChain(Chains[Chain.FANTOM])
    if (!switched) {
      setErrorMessage("You must switch chain to Fantom to create a proposal.")
      setHandlingTx(false)
      return
    }

    const formData = new FormData(event.target)

    // const projectName = formData.get("projectName");
    const dateEnd = formData.get("dateEnd")
    const votingMethod = formData.get("votingMethod")
    const numberOfOptions = formData.get("numberOfOptions")
    let root = "0x0000000000000000000000000000000000000000000000000000000000000000"

    // TODO process files
    // generate merkle tree root
    // store image, proposal name + options names

    let deadline = 0
    if (dateEnd) {
      const currentDate = new Date()
      const futureDate = new Date(dateEnd)

      if (futureDate <= currentDate) {
        setErrorMessage("End date must be in the future.")
        setHandlingTx(false)
      } else {
        deadline = futureDate.getTime() / 1000
      }
    }
    const contract = getExecutorContract()
    try {
      setErrorMessage("Please, confirm the transaction to create your proposal.")
      const tx = await contract.createProposal(Number(votingMethod), deadline, Number(numberOfOptions), root)
      const receipt = tx.wait()
      console.log(receipt)
      setErrorMessage("Proposal successfully created.")
      setHandlingTx(false)
    } catch (error) {
      setErrorMessage("You must confirm the transaction.")
      setHandlingTx(false)
    }
  }

  return (
    <FormWrapper>
      <StyledForm onSubmit={handle}>
        <StyledLabel>Name of Proposal</StyledLabel>
        <StyledInput type="text" name="projectName" />

        <StyledLabel>Select voting end (leave empty for never-ending proposal)</StyledLabel>
        <StyledInput type="date" name="dateEnd" />

        <StyledLabel>Upload Picture</StyledLabel>
        <StyledInput type="file" name="picture" accept="image/*" />

        <StyledLabel>Select Voting Format</StyledLabel>
        <StyledSelect name="votingMethod">
          <option value="0">D21 – Janecek method</option>
        </StyledSelect>

        <StyledLabel>Number of Choices</StyledLabel>
        <StyledSelect name="numberOfOptions" onChange={(event) => setNumberOfChoices(Number(event.target.value))}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </StyledSelect>
        <StyledLabel>Names for Your Choices</StyledLabel>
        {inputsArray.map((index) => (
          <StyledInput key={index} type="text" name={`choice_${index}`} />
        ))}

        <StyledLabel>Voter addresses (leave empty for public)</StyledLabel>
        <StyledInput type="file" name="csvFile" accept=".csv" />

        <StyledButton disabled={handlingTx} type="submit">
          Create Project
        </StyledButton>
      </StyledForm>
    </FormWrapper>
  )
}

export default Form
