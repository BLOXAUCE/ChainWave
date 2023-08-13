import sepolia from "../assets/sepolia.png";
import fuji from "../assets/Fuji.png";
import fantom from "../assets/fantom.png";
import bsc from "../assets/bsc.png";

export const Chain = {
  FANTOM: "FANTOM",
  BSC: "BSC",
  SEPOLIA: "SEPOLIA",
  FUJI: "FUJI"
}

export const GetChainImage = {
  FANTOM: fantom,
  BSC: bsc,
  SEPOLIA: sepolia,
  FUJI: fuji
}

export const GetChainById = {
  "0xfa2": "FANTOM",
  "0x61": "BSC",
  "0xa869": "FUJI",
  "0xaa36a7": "SEPOLIA"
}

export const FANTOM = {
  chain: Chain.FANTOM,
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

export const BSC = {
  chain: Chain.BSC,
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

export const FUJI = {
  chain: Chain.FUJI,
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

export const SEPOLIA = {
  chain: Chain.SEPOLIA,
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

export const Chains = {
  FANTOM: FANTOM,
  BSC: BSC,
  SEPOLIA: SEPOLIA,
  FUJI: FUJI
}
