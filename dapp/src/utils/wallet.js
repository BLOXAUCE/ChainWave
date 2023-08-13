import { ethers } from "ethers";
import { isMobileDevice } from "./utils";

// metamask ethereum.window
let metamaskProvider;
// etherjs connected provider
export let provider;

// this function must be called to initialize reusable provider with window.ethereum.isMetaMask
export const initializeProviderWithMetamaskProvider = () => {
  provider = new ethers.providers.Web3Provider(metamaskProvider);
};

// this function must be called prior to all other functions in this library
export const metamaskGetOrReportMissing = () => {
  if (window.ethereum) {
    if (window.ethereum.providers) {
      metamaskProvider = window.ethereum.providers.find(
        (provider) => provider.isMetaMask
      );
    } else if (window.ethereum.isMetaMask) {
      metamaskProvider = window.ethereum;
    }
  }

  return metamaskProvider ? true : false;
};

export const metamaskSwitchAndAddChain = async (chain) => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chain.params.chainId }],
    });
    return true
  } catch (error) {
    // This error code indicates that the chain has not been added to MetaMask
    if (
      // https://github.com/MetaMask/metamask-mobile/issues/3312
      // metamask mobile returns -32603 error instead of 4902
      error.code === 4902 ||
      error?.data?.orginalError?.code === 4902 ||
      error.code === -32603
    ) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [chain.params],
        });
        return true
      } catch (addError) {
        console.error(addError);
        return false
      }
    }
    console.error(error);
    return false
  }
};

export const metamaskSelectAccount = async () => {
  let accounts;
  // wallet_requestPermissions does not work on mobile, proceed to login
  // https://docs.metamask.io/guide/rpc-api.html#wallet-requestpermissions
  if (metamaskProvider) {
    if (isMobileDevice()) {
      accounts = await metamaskProvider.request({
        method: "eth_requestAccounts",
      });
    } else {
      accounts = await metamaskProvider
        .request({
          method: "wallet_requestPermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        })
        .then(() =>
          metamaskProvider.request({
            method: "eth_requestAccounts",
          })
        );
    }
    return accounts[0];
  }
};
