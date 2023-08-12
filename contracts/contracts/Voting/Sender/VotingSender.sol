// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

import "../../lzApp/NonblockingLzApp.sol";
import "./VotingSenderInterface.sol";
import "./VotingSenderStorage.sol";

/**
 * @title Voting Sender
 * @author Bloxauce
 * @notice Sends a crosschain message to Voting Executor
 */
contract VotingSender is VotingSenderStorage, VotingSenderInterface, NonblockingLzApp {
    constructor(uint16 _executorChainId, address _lzEndpoint) NonblockingLzApp(_lzEndpoint) {
        executorChainId = _executorChainId;
    }

    function sendVote(uint256 proposalId, uint8 optionId, bool vote, bytes32[] memory proof) external payable override {
        bytes memory payload = abi.encode(
            msg.sender,
            proposalId,
            optionId,
            vote,
            proof
        );
        _lzSend(executorChainId, payload, payable(msg.sender), address(0x0), bytes(""), msg.value);
        emit VoteSent(proposalId, optionId, msg.sender, vote);
    }

    function _nonblockingLzReceive(uint16, bytes memory, uint64, bytes memory) internal override {}
}
