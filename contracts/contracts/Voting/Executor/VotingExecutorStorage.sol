// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VotingExecutorStructures.sol";

/**
 * @title Voting Executor Storage
 * @author Bloxauce
 * @notice Defines Voting executor storage
 */
abstract contract VotingExecutorStorage is VotingExecutorStructures {
    // proposals are marked 1..X
    uint256 internal lastProposalId;
    mapping(uint256 => Proposal) public proposals;
}
