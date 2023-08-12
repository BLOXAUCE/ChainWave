import styled from "styled-components";
import mumbai from "../assets/mumbai.png";
import theme from "../theme/theme";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

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

function ChainPrices() {
  const [gasPriceFuji, setGasPriceFuji] = useState(null);
  const [gasPriceBSC, setGasPriceBSC] = useState(null);
  const [gasPriceFantom, setGasPriceFantom] = useState(null);
  const [gasPriceSepolia, setGasPriceSepolia] = useState(null);

  const RPC_URL_FUJI = "https://ava-testnet.public.blastapi.io/ext/bc/C/rpc";
  const RPC_URL_BSC = "https://bsc-testnet.publicnode.com";
  const RPC_URL_FANTOM = "https://rpc.ankr.com/fantom_testnet";
  const RPC_URL_SEPOLIA = "https://sepolia.gateway.tenderly.co";

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
        <ChainImage src={mumbai} />
        {parseFloat(gasPriceFuji).toFixed(2)} gwei
        <ChainSwitchButton>Switch</ChainSwitchButton>
      </ChainItem>
      <ChainItem>
        BSC
        <ChainImage src={mumbai} />
        {parseFloat(gasPriceBSC).toFixed(2)} gwei
        <ChainSwitchButton>Switch</ChainSwitchButton>
      </ChainItem>
      <ChainItem>
        Fantom
        <ChainImage src={mumbai} />
        {parseFloat(gasPriceFantom).toFixed(2)} gwei
        <ChainSwitchButton>Switch</ChainSwitchButton>
      </ChainItem>
      <ChainItem>
        Sepolia
        <ChainImage src={mumbai} />
        {parseFloat(gasPriceSepolia).toFixed(2)} gwei
        <ChainSwitchButton>Switch</ChainSwitchButton>
      </ChainItem>
    </ChainWrapper>
  );
}

export default ChainPrices;
