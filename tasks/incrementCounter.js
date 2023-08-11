const CHAIN_ID = require("../constants/chainIds.json")
const ENDPOINTS = require("../constants/layerzeroEndpoints.json")

module.exports = async function (taskArgs, hre) {
    const remoteChainId = CHAIN_ID[taskArgs.targetNetwork]
    const votingSender = await ethers.getContract("VotingSender")

    console.log(votingSender.address)
    console.log(remoteChainId)
    // quote fee with default adapterParams
    let adapterParams = ethers.utils.solidityPack(["uint16", "uint256"], [1, 900000]) // default adapterParams example
    const gasPriceWei = await ethers.provider.getGasPrice()
    const gasPriceGwei = ethers.utils.formatUnits(gasPriceWei, "gwei")
    console.log(gasPriceGwei)
    const endpoint = await ethers.getContractAt("ILayerZeroEndpoint", ENDPOINTS[hre.network.name])
    let fees = await endpoint.estimateFees(remoteChainId, votingSender.address, "0x", false, adapterParams)
    console.log(`fees[0] (wei): ${fees[0]} / (eth): ${ethers.utils.formatEther(fees[0])}`)
    const message = "hello"
    const messageBytes = ethers.utils.toUtf8Bytes(message)

    let tx = await (await votingSender.incrementCounter(remoteChainId, messageBytes, { value: fees[0] })).wait()
    console.log(`✅ Message Sent [${hre.network.name}] incrementCounter on destination votingSender @ [${remoteChainId}]`)
    console.log(`tx: ${tx.transactionHash}`)

    console.log(``)
    console.log(`Note: to poll/wait for the message to arrive on the destination use the command:`)
    console.log(`       (it may take a minute to arrive, be patient!)`)
    console.log("")
    console.log(`    $ npx hardhat --network ${taskArgs.targetNetwork} ocPoll`)
}
