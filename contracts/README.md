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
* executor - BSC testnet - 0x1F4A55f55f60A0363aC54ee7B110dC19167cb4EF
* sender - Sepolia - 0x504707C455ecAaA2C66cf0Ee5802b80bfeb07E93
* sender - Fantom testnet - 0xB2E37E487b9297401EeCd04B5629E15242865743
* sender - Fuji - 0xB2E37E487b9297401EeCd04B5629E15242865743
