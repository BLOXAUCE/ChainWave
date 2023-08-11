task("incrementCounter", "increment the destination OmniCounter", require("./incrementCounter")).addParam(
    "targetNetwork",
    "the target network name, ie: fuji, or mumbai, etc (from hardhat.config.js)"
)

task("kokot", "kokot", require("./kokot"))

task(
    "setTrustedRemote",
    "setTrustedRemote(chainId, sourceAddr) to enable inbound/outbound messages with your other contracts",
    require("./setTrustedRemote")
)
    .addParam("targetNetwork", "the target network to set as a trusted remote")
    .addOptionalParam("localContract", "Name of local contract if the names are different")
    .addOptionalParam("remoteContract", "Name of remote contract if the names are different")
    .addOptionalParam("contract", "If both contracts are the same name")

task("ocPoll", "poll the counter of the OmniCounter", require("./ocPoll"))
