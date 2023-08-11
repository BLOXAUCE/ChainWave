const CHAIN_ID = require("../constants/chainIds.json")
const { getDeploymentAddresses } = require("../utils/readStatic")

module.exports = async function (taskArgs, hre) {
    let localContract, remoteContract

    if (taskArgs.contract) {
        localContract = taskArgs.contract
        remoteContract = taskArgs.contract
    } else {
        localContract = taskArgs.localContract
        remoteContract = taskArgs.remoteContract
    }

    if (!localContract || !remoteContract) {
        console.log("Must pass in contract name OR pass in both localContract name and remoteContract name")
        return
    }

    // get local contract
    // Vytváří spojení Executor - Sender
    const localContractInstance = await ethers.getContract("VotingExecutor")

    //Odkomentovat pokud chceš vytvářet spojení Sender Executor
    //const localContractInstance = await ethers.getContract("VotingSender")

    // get deployed remote contract address
    const remoteAddress = getDeploymentAddresses(taskArgs.targetNetwork)[remoteContract]

    // get remote chain id
    const remoteChainId = CHAIN_ID[taskArgs.targetNetwork]

    console.log("remoteAddress:", remoteAddress)
    console.log("localContractInstance.address:", localContractInstance.address) // concat remote and local address

    // Tady musíš vyměnit adresy tj Remote adresa (Kam spojuješ) a Local adresa(Odkud spojuješ)
    // v tomto případě teda Z adresy Executora na adresu Sendera, kdyby si odkomentoval vršek tak jen opačně
    let remoteAndLocal = hre.ethers.utils.solidityPack(
        ["address", "address"],
        ["0x085543750e56663faba65C2e94E2344691aA7AD6", "0x6dbd9c7a43f5AfDaF79c9e1ACcd84b0218A5a5D4"]
    )

    // // concat remote and local address
    // let remoteAndLocal = hre.ethers.utils.solidityPack(
    //     ['address','address'],
    //     [remoteAddress, localContractInstance.address]
    // )
    // check if pathway is already set
    const isTrustedRemoteSet = await localContractInstance.isTrustedRemote(remoteChainId, remoteAndLocal)

    if (!isTrustedRemoteSet) {
        try {
            let tx = await (await localContractInstance.setTrustedRemote(remoteChainId, remoteAndLocal)).wait()
            console.log(`✅ [${hre.network.name}] setTrustedRemote(${remoteChainId}, ${remoteAndLocal})`)
            console.log(` tx: ${tx.transactionHash}`)
        } catch (e) {
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
