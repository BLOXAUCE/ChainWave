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

