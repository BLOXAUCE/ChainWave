require("dotenv").config()
require("solidity-coverage")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("@nomiclabs/hardhat-etherscan")
require("./tasks")

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defaultNetwork: "hardhat",
    solidity: {
        compilers: [
            {
                version: "0.8.17",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 99999,
                    },
                },
            },
        ],
    },
    namedAccounts: {
        deployer: "privatekey://" + process.env.PRIVATE_KEY
    },

    networks: {
        hardhat: {
            allowUnlimitedContractSize: true,
        },
        ethereum: {
            url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
            chainId: 1,
            accounts: [process.env.PRIVATE_KEY],
        },
        bsc: {
            url: "https://bsc-dataseed1.binance.org",
            chainId: 56,
            accounts: [process.env.PRIVATE_KEY],
        },
        avalanche: {
            url: "https://api.avax.network/ext/bc/C/rpc",
            chainId: 43114,
            accounts: [process.env.PRIVATE_KEY],
        },
        polygon: {
            url: "https://rpc-mainnet.maticvigil.com",
            chainId: 137,
            accounts: [process.env.PRIVATE_KEY],
        },
        arbitrum: {
            url: `https://arb1.arbitrum.io/rpc`,
            chainId: 42161,
            accounts: [process.env.PRIVATE_KEY],
        },
        optimism: {
            url: `https://mainnet.optimism.io`,
            chainId: 10,
            accounts: [process.env.PRIVATE_KEY],
        },
        fantom: {
            url: `https://rpcapi.fantom.network`,
            chainId: 250,
            accounts: [process.env.PRIVATE_KEY],
        },

        goerli: {
            url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
            chainId: 5,
            accounts: [process.env.PRIVATE_KEY],
        },
        "bsc-testnet": {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
            chainId: 97,
            accounts: [process.env.PRIVATE_KEY],
        },
        fuji: {
            url: `https://api.avax-test.network/ext/bc/C/rpc`,
            chainId: 43113,
            accounts: [process.env.PRIVATE_KEY],
        },
        mumbai: {
            url: "https://rpc-mumbai.maticvigil.com/",
            chainId: 80001,
            accounts: [process.env.PRIVATE_KEY],
        },
        sepolia: {
            url: "https://eth-sepolia.g.alchemy.com/v2/demo/",
            chainId: 11155111,
            accounts: [process.env.PRIVATE_KEY],
        },
        "arbitrum-goerli": {
            url: `https://goerli-rollup.arbitrum.io/rpc/`,
            chainId: 421613,
            accounts: [process.env.PRIVATE_KEY],
        },
        "optimism-goerli": {
            url: `https://goerli.optimism.io/`,
            chainId: 420,
            accounts: [process.env.PRIVATE_KEY],
        },
        "fantom-testnet": {
            url: `https://rpc.testnet.fantom.network/`,
            chainId: 4002,
            accounts: [process.env.PRIVATE_KEY],
        },
    },
}
