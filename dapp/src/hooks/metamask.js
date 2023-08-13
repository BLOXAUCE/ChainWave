import { useState, useEffect } from "react";

const useMetaMask = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [networkId, setNetworkId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        setIsConnected(true);
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        setSelectedAddress(accounts[0]);
        const networkId = await window.ethereum.request({
          method: "eth_chainId",
        });
        setNetworkId(networkId);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    }
  };

  const metamaskSwitchAndAddChain = async (chainInput) => {
    try {
      // Check if the chain to connect to is installed and connect to it
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainInput.params.chainId }],
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // If it is not, then install it into the user MetaMask
      if (
        // https://github.com/MetaMask/metamask-mobile/issues/3312
        // metamask mobile returns -32603 error instead of 4902
        // metamask dev team is working on it
        // and recommends trying error?.data?.orginalError?.code === 4902
        error.code === 4902 ||
        error?.data?.orginalError?.code === 4902 ||
        error.code === -32603
      ) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [chainInput.params],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      console.error(error);
    }
  };

  useEffect(() => {
    // Listen for changes in the Ethereum address
    window.ethereum.on("accountsChanged", (accounts) => {
      setSelectedAddress(accounts[0]);
      setIsConnected(!!accounts.length);
    });

    // Listen for changes in the Ethereum network
    window.ethereum.on("chainChanged", (networkId) => {
      setNetworkId(networkId);
    });

    return () => {
      // Cleanup the event listeners when the component unmounts
      window.ethereum.removeAllListeners("accountsChanged");
      window.ethereum.removeAllListeners("chainChanged");
    };
  }, []);

  return {
    isConnected,
    networkId,
    selectedAddress,
    connectToMetaMask,
    metamaskSwitchAndAddChain,
  };
};

export default useMetaMask;
