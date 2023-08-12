// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Voting Executor Structures
 * @author Bloxauce
 * @notice Defines Voting Executor enums and structures
 */
interface VotingExecutorStructures {
    enum VotingFormat {
        D21_JANACEK_METHOD
    }
    
    struct Proposal {
        VotingFormat format;
        bytes32 merkleTreeRoot;
        uint64 deadline;
        uint8 optionsLength;
        mapping(uint8 => Option) options;
        mapping(address => uint8) addressPositiveVotes;
        mapping(address => uint8) addressNegativeVotes;
    }

    struct Option {
        uint128 positiveVotes;
        uint128 negativeVotes;
    }
}
