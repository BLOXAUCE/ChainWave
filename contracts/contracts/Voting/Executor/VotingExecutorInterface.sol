// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VotingExecutorStructures.sol";

/**
 * @title Voting Executor Interface
 * @author Bloxauce
 * @notice Defines Voting Executor Interface
 */
interface VotingExecutorInterface is VotingExecutorStructures {    
    /**
     * @notice Event emitted when a vote is recorded
     * @param id Proposal id
     * @param voter Address of the voter
     * @param vote Positive or negative vote
     */
    event VoteRecorded(uint256 indexed id, uint256 indexed optionId, address indexed voter, bool vote);
    /**
     * @notice Event emitted when a proposal is created
     * @param id Proposal id
     * @param format Structure of the voting
     * @param root Merkle tree root if voting is private
     */
    event ProposalCreated(uint256 indexed id, VotingFormat indexed format, bytes32 root, uint64 deadline);

    /**
     * @notice Creates a proposal for voting
     * @param format Selected format of voting
     * @param deadline Until when can people vote
     * @param length Number of options
     * @param root Merkle tree root if voting is locked. Leave empty for public voting
     */
    function createProposal(VotingFormat format, uint64 deadline, uint8 length, bytes32 root) external;

    /**
     * @notice Gets the number of positive and negative votes of all options in a proposal
     * @param proposalId Proposal id
     * @return array of positive votes sorted by id
     * @return array of negative votes sorted by id
     */
    function getProposalStatus(uint256 proposalId) external view returns(uint256[] memory, uint256[] memory);

    /**
     * @notice Gets the number of votes for an address for proposal
     * @param proposalId Proposal id
     * @param voter Address of the voter
     * @return positive votes
     * @return negative votes
     */
    function getAddressVotesForProposal(uint256 proposalId, address voter) external view returns(uint256, uint256);
}
