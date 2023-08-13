# Voteem - Governance DApp contracts

## Init
`yarn install`   
`npx hardhat compile`   

## Deployment
`npx hardhat deploy --network <network_name> --tags <contract_name>`
* <network_name> see hardhat.config.js
* <contract_name> VotingExecutor || VotingSender

## Tasks
`npx hardhat setTrustedRemote --network <network_name> --target-network <target_network_name> --src-contract <contract_name> --dst-contract <contract_name>`
* <network_name> see hardhat.config.js
* <target_network_name> see hardhat.config.js
* <contract_name> VotingExecutor || VotingSender

## Deployed contracts
* executor - Fantom testnet - 0x6882630e42Eae25A27b0556b252fC9d01E1403f5
* sender - Sepolia - 0x1F4A55f55f60A0363aC54ee7B110dC19167cb4EF
* sender - BSC testnet - 0x0F5747438663226c80Ba01bBe0ad63DAaeB9C39d
* sender - Fuji - 0xdC128579A05C0668A0fd4d5991663dc9b202826f
