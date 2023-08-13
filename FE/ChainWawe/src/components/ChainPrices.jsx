import styled from "styled-components";
import sepolia from "../assets/sepolia.png";
import fuji from "../assets/Fuji.png";
import fantom from "../assets/fantom.png";
import bsc from "../assets/bsc.png";

import theme from "../theme/theme";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useMetaMask from "../hooks/metamask";

const ChainWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media screen and (${theme.breakpoints.forPhoneOnly}) {
    gap: 2rem;
  }
`;

const ChainItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: clamp(1.4rem, 0.8vw, 1.6rem);

  align-items: center;
`;

const ChainImage = styled.img`
  width: 45px;
  @media screen and (${theme.breakpoints.forPhoneOnly}) {
    width: 24px;
  }
`;

const ChainSwitchButton = styled.button`
  background: transparent;
  font-size: clamp(1.1rem, 0.8vw, 1.1rem);
  color: white;
  cursor: pointer;
  border: 1px solid white;
`;

const FANTOM = {
  params: {
    chainId: "0xfa2",
    chainName: "Fantom",
    nativeCurrency: {
      name: "FTM",
      symbol: "FTM",
      decimals: 18,
    },
    blockExplorerUrls: ["https://testnet.ftmscan.com/"],
    rpcUrls: [
      "https://fantom-testnet.public.blastapi.io",
      "https://rpc.ankr.com/fantom_testnet",
    ],
  },
};

const BSC = {
  params: {
    chainId: "0x61",
    chainName: "BNB Smart Chain Testnet",
    nativeCurrency: {
      name: "tBNB",
      symbol: "tBNB",
      decimals: 18,
    },
    blockExplorerUrls: ["https://testnet.bscscan.com"],
    rpcUrls: [
      "https://bsc-testnet.public.blastapi.io",
      "https://bsc-testnet.publicnode.com",
    ],
  },
};

const FUJI = {
  params: {
    chainId: "0xa869",
    chainName: "Avalanche Fuji Testnet",
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    blockExplorerUrls: ["https://testnet.snowtrace.io"],
    rpcUrls: [
      "https://ava-testnet.public.blastapi.io/ext/bc/C/rpc",
      "https://avalanche-fuji-c-chain.publicnode.com	",
    ],
  },
};

const SEPOLIA = {
  params: {
    chainId: "0xaa36a7",
    chainName: "Sepolia",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://testnet.snowtrace.io"],
    rpcUrls: [
      "https://gateway.tenderly.co/public/sepolia	",
      "https://rpc2.sepolia.org",
    ],
  },
};

function ChainPrices() {
  const [gasPriceFuji, setGasPriceFuji] = useState(null);
  const [gasPriceBSC, setGasPriceBSC] = useState(null);
  const [gasPriceFantom, setGasPriceFantom] = useState(null);
  const [gasPriceSepolia, setGasPriceSepolia] = useState(null);

  const RPC_URL_FUJI = "https://ava-testnet.public.blastapi.io/ext/bc/C/rpc";
  const RPC_URL_BSC = "https://bsc-testnet.publicnode.com";
  const RPC_URL_FANTOM = "https://rpc.ankr.com/fantom_testnet";
  const RPC_URL_SEPOLIA = "https://sepolia.gateway.tenderly.co";

  const {
    metamaskSwitchAndAddChain,
    // ... other values or functions you may need
  } = useMetaMask();

  useEffect(() => {
    const fetchGasPrice = async () => {
      let provider = new ethers.providers.JsonRpcProvider(RPC_URL_FUJI);
      let price = await provider.getGasPrice();
      setGasPriceFuji(ethers.utils.formatUnits(price, "gwei"));

      provider = new ethers.providers.JsonRpcProvider(RPC_URL_BSC);
      price = await provider.getGasPrice();
      setGasPriceBSC(ethers.utils.formatUnits(price, "gwei"));

      provider = new ethers.providers.JsonRpcProvider(RPC_URL_FANTOM);
      price = await provider.getGasPrice();
      setGasPriceFantom(ethers.utils.formatUnits(price, "gwei"));

      provider = new ethers.providers.JsonRpcProvider(RPC_URL_SEPOLIA);
      price = await provider.getGasPrice();
      setGasPriceSepolia(ethers.utils.formatUnits(price, "gwei"));
    };

    fetchGasPrice();
  }, []);
  return (
    <ChainWrapper>
      <ChainItem>
        Fuji
        <ChainImage src={fuji} />
        {parseFloat(gasPriceFuji).toFixed(2)} gwei
        <ChainSwitchButton onClick={() => metamaskSwitchAndAddChain(FUJI)}>
          Switch
        </ChainSwitchButton>
      </ChainItem>
      <ChainItem>
        BSC
        <ChainImage src={bsc} />
        {parseFloat(gasPriceBSC).toFixed(2)} gwei
        <ChainSwitchButton onClick={() => metamaskSwitchAndAddChain(BSC)}>
          Switch
        </ChainSwitchButton>
      </ChainItem>
      <ChainItem>
        Fantom
        <ChainImage src={fantom} />
        {parseFloat(gasPriceFantom).toFixed(2)} gwei
        <ChainSwitchButton onClick={() => metamaskSwitchAndAddChain(FANTOM)}>
          Switch
        </ChainSwitchButton>
      </ChainItem>
      <ChainItem>
        Sepolia
        <ChainImage src={sepolia} />
        {parseFloat(gasPriceSepolia).toFixed(2)} gwei
        <ChainSwitchButton onClick={() => metamaskSwitchAndAddChain(SEPOLIA)}>
          Switch
        </ChainSwitchButton>
      </ChainItem>
    </ChainWrapper>
  );
}

export default ChainPrices;
