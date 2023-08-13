module.exports = async function (taskArgs, hre) {
    const votingExecutor = await ethers.getContract("VotingExecutor")
    console.log("Creating proposal in Executor contract: " + votingExecutor.address)

    let tx = await (
        await votingExecutor.createProposal(0, 1692732803, 5, "0x0000000000000000000000000000000000000000000000000000000000000000")
    ).wait()
    console.log(`✅ Proposal crated`)
    console.log(`tx: ${tx.transactionHash}`)
}
