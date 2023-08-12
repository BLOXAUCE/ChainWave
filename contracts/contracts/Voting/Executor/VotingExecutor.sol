// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

import "../../lzApp/NonblockingLzApp.sol";
import "./VotingExecutorInterface.sol";
import "./VotingExecutorStorage.sol";
import "../Sender/VotingSenderInterface.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

/**
 * @title Voting Executor
 * @author Bloxauce
 * @notice Contract to create projects and collect votes
 */
contract VotingExecutor is VotingExecutorStorage, VotingExecutorInterface, VotingSenderInterface, NonblockingLzApp {
    using ECDSA for bytes32;
    constructor(address _lzEndpoint) NonblockingLzApp(_lzEndpoint) {}

    function sendVote(uint256 proposalId, uint8 optionId, bool vote, bytes32[] memory proof) external override payable {
        processVote(proposalId, optionId, vote, msg.sender, proof);
    }

    function createProposal(VotingFormat format, uint64 deadline, uint8 length, bytes32 root) external override {
        lastProposalId++;
        uint256 nextProposalId = lastProposalId;
        Proposal storage proposal = proposals[nextProposalId];
        proposal.format = format;
        proposal.merkleTreeRoot = root;
        proposal.optionsLength = length;
        proposal.deadline = deadline;
    }

    function getProposalStatus(uint256 proposalId) external override view returns(uint256[] memory, uint256[] memory) {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.optionsLength > 0, "Invalid proposal");
        uint256[] memory numberOfPositiveVotesPerOption = new uint256[](proposal.optionsLength);
        uint256[] memory numberOfNegativeVotesPerOption = new uint256[](proposal.optionsLength);
        for (uint8 i = 0; i < proposal.optionsLength; ++i) {
            Option storage option = proposal.options[i];
            numberOfPositiveVotesPerOption[i] = option.positiveVotes;
            numberOfNegativeVotesPerOption[i] = option.negativeVotes;
        }
        return (numberOfPositiveVotesPerOption, numberOfNegativeVotesPerOption);
    }

    function getAddressVotesForProposal(uint256 proposalId, address voter) external override view returns(uint256, uint256) {
        Proposal storage proposal = proposals[proposalId];
        return (proposal.addressPositiveVotes[voter], proposal.addressNegativeVotes[voter]);
    }

    function _nonblockingLzReceive(uint16 _srcChainId, bytes memory _srcAddress, uint64 _nonce, bytes memory _payload) internal override {
        // TODO decode and process payload
        uint256 proposalId;
        uint8 optionId;
        bool vote;
        address voter;
        bytes32[] memory proof;
        processVote(proposalId, optionId, vote, voter, proof);
    }

    function processVote(uint256 proposalId, uint8 optionId, bool vote, address voter, bytes32[] memory proof) private {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.deadline < block.timestamp, "Voting is over");
        require(optionId < proposal.optionsLength, "Incorrect option id");
        // sanity check public / private proposal
        if (proposal.merkleTreeRoot != 0) {
            require(MerkleProof.verify(proof, proposal.merkleTreeRoot, keccak256(abi.encodePacked(voter))), "Cannot vote");
        }
        // sanity check by format
        if (proposal.format == VotingFormat.D21_JANACEK_METHOD) {
            validateD21JanacekMethod(vote, proposal.addressPositiveVotes[voter] + proposal.addressNegativeVotes[voter]);
        }
        // provess vote
        if (vote) {
            ++proposal.options[optionId].positiveVotes;
            ++proposal.addressPositiveVotes[voter];
        } else {
            ++proposal.options[optionId].negativeVotes;
            ++proposal.addressNegativeVotes[voter];
        }
    }

    function validateD21JanacekMethod(bool vote, uint256 voterVotes) private pure {
        require(voterVotes < 3, "Voter has already distributed all their votes");
        if (vote) {
            require(voterVotes < 2, "Voter has already distributed their positive votes");
        } else {
            require(voterVotes == 2, "Voter cannot distribute negative vote");
        }
    }
}
