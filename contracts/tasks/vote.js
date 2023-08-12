const CHAIN_ID = require("../constants/chainIds.json")
const ENDPOINTS = require("../constants/layerzeroEndpoints.json")

module.exports = async function (taskArgs, hre) {
    const remoteChainId = CHAIN_ID["bsc-testnet"]
    const votingSender = await ethers.getContract("VotingSender")

    console.log("Sending vote to contract: " + votingSender.address)

    const adapterParams = ethers.utils.solidityPack(["uint16", "uint256"], [1, 900000]) // default adapterParams example
    const gasPriceWei = await ethers.provider.getGasPrice()
    const gasPriceGwei = ethers.utils.formatUnits(gasPriceWei, "gwei")
    const endpoint = await ethers.getContractAt("ILayerZeroEndpoint", ENDPOINTS[hre.network.name])
    const fees = await endpoint.estimateFees(remoteChainId, votingSender.address, "0x", false, adapterParams)
    console.log(`fees[0] (wei): ${fees[0]} / (eth): ${ethers.utils.formatEther(fees[0])}`)

    const tx = await (await votingSender.sendVote(1, 1, true, [], { value: fees[0] })).wait()
    console.log(`✅ Message Sent`)
    console.log(`tx: ${tx.transactionHash}`)
}
