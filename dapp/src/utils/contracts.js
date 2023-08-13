import { ethers } from "ethers";
import { provider } from "./wallet";
import abi from "./abi.json"
import { Chain, FANTOM } from "./chains";

const ContractType = {
  EXECUTOR: "EXECUTOR",
  SENDER: "SENDER",
  MULTICALL: "MULTICALL",
  LZ_ENDPOINT: "LZ_ENDPOINT"
}

const executorAddress = {
  FANTOM: "0x6882630e42Eae25A27b0556b252fC9d01E1403f5"
}

const senderAddress = {
  BSC: "0x0F5747438663226c80Ba01bBe0ad63DAaeB9C39d",
  SEPOLIA: "0x1F4A55f55f60A0363aC54ee7B110dC19167cb4EF",
  FUJI: "0xdC128579A05C0668A0fd4d5991663dc9b202826f"
}

const multicallAddress = {
  FANTOM: "0x91eCdf26A91D72ec5cA44A496A422B8036A2B86B"
}

const lzEndpointAddress = {
  BSC: "0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1",
  FUJI: "0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706",
  FANTOM: "0x7dcAD72640F835B0FA36EFD3D6d3ec902C7E5acf",
  SEPOLIA: "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1"
}

const getContractAddress = (contractType, chain) => {
  if (contractType === ContractType.EXECUTOR) {
    return executorAddress[Chain.FANTOM]
  } else if (contractType === ContractType.SENDER) {
    return senderAddress[chain]
  } else if (contractType === ContractType.MULTICALL) {
    return multicallAddress[Chain.FANTOM]
  } else if (contractType === ContractType.LZ_ENDPOINT) {
    return lzEndpointAddress[chain]
  } return undefined
}

// provider from wallet.js must be initialized
export const getLzEndpointContract = (chain) => {
  if (provider) {
    return new ethers.Contract(
      getContractAddress(ContractType.LZ_ENDPOINT, chain),
      abi[ContractType.LZ_ENDPOINT],
      provider.getSigner()
    );
  } else return undefined
};

// provider from wallet.js must be initialized
export const getSenderContract = (chain) => {
  if (provider) {
    return new ethers.Contract(
      getContractAddress(ContractType.SENDER, chain),
      abi[ContractType.SENDER],
      provider.getSigner()
    );
  } else return undefined
}

export const getExecutorContract = () => {
  if (provider) {
    return new ethers.Contract(
      getContractAddress(ContractType.EXECUTOR, Chain.FANTOM),
      abi[ContractType.EXECUTOR],
      provider.getSigner()
    );
  } else return undefined
}

export let contractExecutorFantom;
export let contractMulticallFantom;

export const initializeContracts = () => {
  const providerLocal = new ethers.providers.JsonRpcProvider(FANTOM.params.rpcUrls[1]);

  contractExecutorFantom = new ethers.Contract(
    getContractAddress(ContractType.EXECUTOR),
    abi[ContractType.EXECUTOR],
    providerLocal
  )

  contractMulticallFantom = new ethers.Contract(
    getContractAddress(ContractType.MULTICALL),
    abi[ContractType.MULTICALL],
    providerLocal
  )
}
