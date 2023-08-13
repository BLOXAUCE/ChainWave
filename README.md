# Vote'em: Multi-Chain Governance DApp © 2023 Bloxauce

## Project page
https://ethglobal.com/showcase/vote-em-multi-chain-decentralized-voting-iymfu

## About
Introducing Vote'em: Multi-Chain Governance DApp

At the cutting-edge intersection of blockchain technology and decentralized decision-making, our project, conceived and crafted during a thrilling Superhack, stands as a testament to innovation and collaboration. Meet Vote'em an ingenious solution that paves the way for seamless cross-chain governance, leveraging the power of Ethereum Virtual Machine (EVM) blockchains.

Vote'em addresses a pressing challenge in the realm of decentralized governance – how to streamline decision-making processes across multiple EVM blockchains, ensuring inclusivity, security, and scalability. With contracts strategically deployed across various EVM chains, our project orchestrates a harmonious symphony of consensus, enabling effective cross-chain governance through a unique and robust framework.

At the heart of our innovation lies the "Executor" contract, a central hub that elegantly collects and tallies votes from diverse blockchain sources. Complementing the executor are "Sender" contracts, designed to facilitate the secure transmission of votes from disparate chains to the mainchain executor. This architecture establishes a seamless bridge between blockchain ecosystems, ensuring a frictionless flow of decision-making data.

What truly sets Vote'em apart is its user-centric interface for proposal creation and voting. With utmost simplicity, any user can initiate a proposal, complete with a range of options to choose from. The user is empowered to designate the proposal as public or private, allowing for both transparency and confidentiality in decision-making. The true democratic essence is manifested as users across chains can actively participate in the voting process, lending their voices to the collective direction.

Intriguingly, each proposal boasts a tailored voting format, with the D21-Janacek method as our initial choice. This method, renowned for its equitable and preference-sensitive approach, lends a fair and balanced weight to each vote, honoring the intricate nuances of decision preferences. Each voter has two positive and one negative vote. Our commitment to continuous improvement shines through as we pave the way for the integration of additional voting formats, promising a dynamic and ever-evolving governance experience.

Vote'em is not just a project; it's a testament to the collaborative spirit of hackathons, the potential of blockchain technology, and the boundless possibilities of decentralized governance. By uniting EVM blockchains under a shared governance umbrella, Vote'em emerges as a trailblazing solution, demonstrating the power of technology to reshape the very foundations of decision-making in the digital age. Welcome to the future of cross-chain governance – welcome to Vote'em.

## Technology
Vote'em: Multi-Chain Governance DApp is a revolutionary project meticulously crafted by leveraging a dynamic tech stack and ingenious design choices. Built at the intersection of blockchain, smart contracts, and user-centric interfaces, Vote'em is a testament to modern innovation. Here's a closer look at the intricate layers that compose this cutting-edge solution:

##### Smart Contracts and Protocol:

The project's backbone is built using Hardhat with Solidity version 0.8.17. Leveraging the LayerZero protocol contracts, an external library, amplifies the efficiency and effectiveness of the contract logic, enabling seamless cross-chain communication and governance functionality. Deployed across multiple testnets – Fantom, BSC, Fuji, and Sepolia – the smart contracts establish a presence across diverse blockchain ecosystems. We have two contracts: VotingExecutor and VotingSender. VotingExecutor is the main contract which holds state for proposals and is collecting and processing votes received from other chains. This contract is one and deployed on Mainnet. For dev environment on Fantom testnet for The Graph support. People can create proposals with this contract or vote. Cross-chain votes are received by utilizing LazerZero cutting edge _nonblockingLzReceive functionality. VotingSender contract is using LayerZero _lzSend function to send a vote.

##### Decentralized Frontend:

The user-facing application is developed using VITE, a build tool that enables rapid frontend development. React, the renowned JavaScript library, forms the foundation of the application's dynamic and interactive interface. Styled Components, a popular CSS-in-JS library, brings the aesthetic component to life, allowing for sleek and customizable UI components. Zustand, a state management library, ensures efficient state management, enabling seamless data flow and rendering.

##### Blockchain Interaction:

Ethers.js, a widely used JavaScript library, empowers the frontend to interact with the blockchain, facilitating contract interactions and data retrieval. This integration allows for a seamless user experience while connecting to the underlying blockchain infrastructure. Wallet integration through MetaMask ensures secure user authentication and interaction with the blockchain. Users can confidently participate in governance activities using their preferred wallets.

##### Data Retrieval and Querying:

The Graph, a blockchain protocol, plays a pivotal role in data querying. By creating a customized subgraph, Vote'em can efficiently retrieve and organize on-chain data for the application's frontend. This optimizes data presentation and user experience, ensuring real-time and relevant information at users' fingertips.

In unison, these technologies and tools converge to form the intricate web that is Vote'em. This project seamlessly integrates blockchain technology, smart contracts, user interfaces, and data retrieval mechanisms, culminating in an innovation that redefines the possibilities of cross-chain governance. With a focus on user empowerment, transparency, and efficiency, Vote'em stands as a groundbreaking solution poised to reshape the landscape of decentralized decision-making across multiple EVM blockchains.

## Contract description
* Voting Executor - to be deployed on mainnet, allows creation of proposals and collects and processes votes
* Voting Sender - to be deployed on any available EVM network with LayerZero support. Sends votes to Voting Executor for processing via cross-chain message

## Deployed contracts
* executor - Fantom testnet - 0x6882630e42Eae25A27b0556b252fC9d01E1403f5
* sender - Sepolia - 0x1F4A55f55f60A0363aC54ee7B110dC19167cb4EF
* sender - BSC testnet - 0x0F5747438663226c80Ba01bBe0ad63DAaeB9C39d
* sender - Fuji - 0xdC128579A05C0668A0fd4d5991663dc9b202826f

## The Graph implementation
* SubGraph link https://thegraph.com/studio/subgraph/hack-voteem/
* Development API link https://api.studio.thegraph.com/query/51091/hack-voteem/version/latest
* Network **Fantom TESTNET**
* Queries
	* AllProposals -> return all proposal that has been created yet
	* AllVotes -> return all votes that has been created yet
	* Propose1Record  -> return all votes for specific proposal
	* propose1recordAndFirstOption -> return all votes for specific proposal and specific option

## Future Updates
* more voting formats
* contracts use proxy
* improve UI and user experience
* ...and more!
