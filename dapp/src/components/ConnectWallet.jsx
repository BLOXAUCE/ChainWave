import { useBlockchainStore, useErrorStore } from "../store/store"
import { initializeProviderWithMetamaskProvider, metamaskGetOrReportMissing, metamaskSelectAccount, metamaskSwitchAndAddChain, provider } from "../utils/wallet"
import { Chain, Chains, GetChainById, GetChainImage } from "../utils/chains"
import { ethers } from "ethers";
import { HeaderItemLogin } from "./Header";
import { getShortAddressString } from "../utils/utils";
import { useEffect } from "react";

function ConnectWallet() {
  const {
    connectWallet,
    connecting,
    setConnecting,
    walletConnected,
    address,
    disconnectWallet,
    network,
    setNetwork
  } = useBlockchainStore();

  const { setErrorMessage } = useErrorStore(); 

  useEffect(() => {
    if (window.ethereum && walletConnected) {
      const handleAccountsChanged = async () => {
        window.ethereum.sendAsync(
          {
            method: "eth_accounts",
            params: [],
            jsonrpc: "2.0",
            id: new Date().getTime(),
          },
          (error, result) => {
            if (result["result"] && result["result"].length !== 0) {
              const selectedAddress = result["result"][0];
              connectWallet(selectedAddress);
            } else {
              disconnectWallet();
            }
          }
        );
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
  
      window.ethereum.on("chainChanged", (networkId) => {
        const chain = GetChainById[networkId]
        setNetwork(chain)
      });
  
      return () => {
        window.ethereum.removeAllListeners("accountsChanged");
        window.ethereum.removeAllListeners("chainChanged");
      };
    }
  }, [walletConnected, connectWallet, disconnectWallet, setNetwork]);

  async function connect() {
    setConnecting(true)
    let selectedAddress;
    let metamaskProvider;
    let signature;

    metamaskProvider = metamaskGetOrReportMissing();
    if (!metamaskProvider) {
      const metamaskLink =
        "https://metamask.app.link/dapp/" +
        window.location.href.replace(/^(https?:\/\/)?(www\.)?/i, "");
      const errorMessage = ["Get MetaMask", metamaskLink];
      setErrorMessage(errorMessage);
      setConnecting(false)
      return;
    }

    // switch chain
    const switched = await metamaskSwitchAndAddChain(Chains[Chain.FANTOM]);
    if (!switched) {
      setErrorMessage("You must switch chain.");
      setConnecting(false)
      return;
    }

    // get account
    try {
      selectedAddress = await metamaskSelectAccount();
    } catch (error) {
      if (error.code === 4001) {
        setErrorMessage("You must select an account.");
      } else {
        setErrorMessage(
          "Unknown error. Most likely did not select an account."
        );
      }
      setConnecting(false)
      return;
    }

    // initialize reusable ethers provider
    initializeProviderWithMetamaskProvider();

    // sign message
    const message = "Connect to Vote'em";
    try {
      signature = await provider.getSigner().signMessage(message);
    } catch (error) {
      if (error.code === -32603 || error.code === "ACTION_REJECTED") {
        setErrorMessage("You must sign the message.");
      } else {
        setErrorMessage(
          "Unknown error. Most likely rejected signing the message."
        );
      }
      setConnecting(false)
      return;
    }

    // sanity check signature and proceed with connection successful
    const address = ethers.utils.verifyMessage(message, signature);
    if (address.toLowerCase() === selectedAddress.toLowerCase()) {
      connectWallet(selectedAddress);
    } else {
      setErrorMessage("Invalid signature. Please try again.");
      setConnecting(false)
      return;
    }
    setConnecting(false)
  }

  return (
    <HeaderItemLogin onClick={() => !connecting && !walletConnected && connect()}>
      &nbsp;{walletConnected ? `${getShortAddressString(address)}` : "Connect Wallet"}&nbsp;
      {walletConnected &&
        <img style={{width:"20px"}} src={GetChainImage[network]} />
      }
    </HeaderItemLogin>
  );
}

export default ConnectWallet;
