pragma solidity ^0.8.0;
pragma abicoder v2;

import "../lzApp/NonblockingLzApp.sol";

/// @title A LayerZero example sending a cross chain message from a source chain to a destination chain to increment a counter
contract VotingSender is NonblockingLzApp {
    constructor(address _lzEndpoint) NonblockingLzApp(_lzEndpoint) {}

    function incrementCounter(uint16 _dstChainId, bytes memory _payload) public payable {
        _lzSend(_dstChainId, bytes(_payload), payable(msg.sender), address(0x0), bytes(""), msg.value);
    }

    function _nonblockingLzReceive(uint16, bytes memory, uint64, bytes memory) internal override {}
}
