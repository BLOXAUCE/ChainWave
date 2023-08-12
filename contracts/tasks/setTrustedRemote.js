const CHAIN_ID = require("../constants/chainIds.json")
const { getDeploymentAddresses } = require("../utils/readStatic")

/**
 *  src-contract ... VotingExecutor / VotingSender
 *  dst-contract ... VotingExecutor / VotingSender
 *  dst-network ... see chainIds.json
 */
module.exports = async function (taskArgs, hre) {
    const srcContract = taskArgs.srcContract
    const dstContract = taskArgs.dstContract
    const dstNetwork = taskArgs.targetNetwork

    if (!srcContract || !dstContract || !dstNetwork) {
        console.log("Params must include src-contract, dst-contract and dst-network")
        return
    }

    const srcContractInstance = await ethers.getContract(srcContract)
    const remoteContractAddress = getDeploymentAddresses(dstNetwork)[dstContract]
    const remoteChainId = CHAIN_ID[dstNetwork]

    console.log("src address:", srcContractInstance.address)
    console.log("remote address:", remoteContractAddress)

    const remoteAndLocal = hre.ethers.utils.solidityPack(
        ["address", "address"],
        [remoteContractAddress, srcContractInstance.address]
    )

    const isTrustedRemoteSet = await srcContractInstance.isTrustedRemote(remoteChainId, remoteAndLocal)

    if (!isTrustedRemoteSet) {
        try {
            let tx = await (await srcContractInstance.setTrustedRemote(remoteChainId, remoteAndLocal)).wait()
            console.log(`✅ [${hre.network.name}] setTrustedRemote(${remoteChainId}, ${remoteAndLocal})`)
            console.log(` tx: ${tx.transactionHash}`)
        } catch (e) {
            console.log(e)
            if (e.error.message.includes("The chainId + address is already trusted")) {
                console.log("*source already set*")
            } else {
                console.log(`❌ [${hre.network.name}] setTrustedRemote(${remoteChainId}, ${remoteAndLocal})`)
            }
        }
    } else {
        console.log("*source already set*")
    }
}
