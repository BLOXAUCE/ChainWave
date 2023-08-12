task("setTrustedRemote", require("./setTrustedRemote"))
    .addParam("targetNetwork", "The target network of the target contract to set as a trusted remote")
    .addParam("srcContract", "Name of source contract")
    .addParam("dstContract", "Name of destination contract")

task("vote", require("./vote"))

task("createProposal", require("./createProposal"))
