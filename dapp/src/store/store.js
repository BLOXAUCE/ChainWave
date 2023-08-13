import { create } from "zustand";

export const useBlockchainStore = create((set) => ({
  connecting: false,
  walletConnected: false,
  address: "0x...",
  network: "FANTOM",
  setConnecting: (connecting) => set({ connecting: connecting }),
  connectWallet: (address) => {
    set({ address: address });
    set({ walletConnected: true });
  },
  disconnectWallet: () => {
    set({ address: "0x..." });
    set({ walletConnected: false });
  },
  setNetwork: (network) => set({ network: network})
}));

export const useErrorStore = create((set) => ({
  errorMessage: "",
  setErrorMessage: (errorMessage) => set(() => ({ errorMessage })),
}))
