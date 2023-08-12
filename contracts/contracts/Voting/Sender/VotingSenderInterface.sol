// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Voting Sender Interface
 * @author Bloxauce
 * @notice Defines Voting Sender Interface
 */
interface VotingSenderInterface {
    /**
     * @notice Event emitted when a vote is sent
     * @param proposalId The proposal id
     * @param optionId The option from the proposal to vote for
     * @param voter Address of the voter
     * @param vote Positive or negative vote
     */
    event VoteSent(uint256 indexed proposalId, uint8 indexed optionId, address indexed voter, bool vote);
    /**
     * @notice Sends a vote to executor
     * @param proposalId Id of the proposal to vote for
     * @param optionId Id of the option
     * @param vote True = positive, false = negative
     * @param proof For merkle tree if applicable
     */
    function sendVote(uint256 proposalId, uint8 optionId, bool vote, bytes32[] memory proof) external payable;
}
