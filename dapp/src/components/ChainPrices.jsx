import styled from "styled-components"
import sepolia from "../assets/sepolia.png"
import fuji from "../assets/Fuji.png"
import fantom from "../assets/fantom.png"
import bsc from "../assets/bsc.png"

import theme from "../theme/theme"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { BSC, Chain, Chains, FANTOM, FUJI, SEPOLIA } from "../utils/chains"
import { metamaskSwitchAndAddChain } from "../utils/wallet"
import { useBlockchainStore } from "../store/store"

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
`

const ChainItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: clamp(1.4rem, 0.8vw, 1.6rem);

  align-items: center;
`

const ChainImage = styled.img`
  width: 45px;
  @media screen and (${theme.breakpoints.forPhoneOnly}) {
    width: 24px;
  }
`

const ChainSwitchButton = styled.button`
  background: transparent;
  font-size: clamp(1.1rem, 0.8vw, 1.1rem);
  color: white;
  cursor: pointer;
  border: 1px solid white;
`

function ChainPrices() {
  const [gasPriceFuji, setGasPriceFuji] = useState(null)
  const [gasPriceBSC, setGasPriceBSC] = useState(null)
  const [gasPriceFantom, setGasPriceFantom] = useState(null)
  const [gasPriceSepolia, setGasPriceSepolia] = useState(null)

  const { walletConnected, network } = useBlockchainStore()

  useEffect(() => {
    const fetchGasPrice = async () => {
      let provider = new ethers.providers.JsonRpcProvider(FUJI.params.rpcUrls[0])
      let price = await provider.getGasPrice()
      setGasPriceFuji(ethers.utils.formatUnits(price, "gwei"))

      provider = new ethers.providers.JsonRpcProvider(BSC.params.rpcUrls[1])
      price = await provider.getGasPrice()
      setGasPriceBSC(ethers.utils.formatUnits(price, "gwei"))

      provider = new ethers.providers.JsonRpcProvider(FANTOM.params.rpcUrls[1])
      price = await provider.getGasPrice()
      setGasPriceFantom(ethers.utils.formatUnits(price, "gwei"))

      provider = new ethers.providers.JsonRpcProvider(SEPOLIA.params.rpcUrls[0])
      price = await provider.getGasPrice()
      setGasPriceSepolia(ethers.utils.formatUnits(price, "gwei"))
    }

    const intervalId = setInterval(fetchGasPrice, 10000)

    fetchGasPrice()

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <ChainWrapper>
      <ChainItem>
        Fuji
        <ChainImage src={fuji} />
        {parseFloat(gasPriceFuji).toFixed(2)} gwei
        <ChainSwitchButton disabled={!walletConnected} onClick={() => metamaskSwitchAndAddChain(Chains[Chain.FUJI])}>
          {network === Chain.FUJI ? "Active" : "Switch"}
        </ChainSwitchButton>
      </ChainItem>
      <ChainItem>
        BSC
        <ChainImage src={bsc} />
        {parseFloat(gasPriceBSC).toFixed(2)} gwei
        <ChainSwitchButton disabled={!walletConnected} onClick={() => metamaskSwitchAndAddChain(Chains[Chain.BSC])}>
          {network === Chain.BSC ? "Active" : "Switch"}
        </ChainSwitchButton>
      </ChainItem>
      <ChainItem>
        Fantom
        <ChainImage src={fantom} />
        {parseFloat(gasPriceFantom).toFixed(2)} gwei
        <ChainSwitchButton disabled={!walletConnected} onClick={() => metamaskSwitchAndAddChain(Chains[Chain.FANTOM])}>
          {network === Chain.FANTOM ? "Active" : "Switch"}
        </ChainSwitchButton>
      </ChainItem>
      <ChainItem>
        Sepolia
        <ChainImage src={sepolia} />
        {parseFloat(gasPriceSepolia).toFixed(2)} gwei
        <ChainSwitchButton disabled={!walletConnected} onClick={() => metamaskSwitchAndAddChain(Chains[Chain.SEPOLIA])}>
          {network === Chain.SEPOLIA ? "Active" : "Switch"}
        </ChainSwitchButton>
      </ChainItem>
    </ChainWrapper>
  )
}

export default ChainPrices
