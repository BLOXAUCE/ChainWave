const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json")
const CHAIN_ID = require("../constants/chainIds.json")

module.exports = async function ({ deployments, getNamedAccounts }) {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    console.log(`>>> Deployer address: ${deployer}`)

    // get the Endpoint address
    const endpointAddr = LZ_ENDPOINTS[hre.network.name]
    const executorChainId = CHAIN_ID["fantom-testnet"]

    console.log(`[${hre.network.name}] Endpoint address: ${endpointAddr}`)

    await deploy("VotingSender", {
        from: deployer,
        args: [executorChainId, endpointAddr],
        log: true,
        waitConfirmations: 1,
    })
}

module.exports.tags = ["VotingSender"]
