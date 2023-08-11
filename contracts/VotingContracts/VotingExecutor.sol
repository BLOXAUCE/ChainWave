pragma solidity ^0.8.0;
pragma abicoder v2;

import "../lzApp/NonblockingLzApp.sol";

/// @title A LayerZero example sending a cross chain message from a source chain to a destination chain to increment a counter
contract VotingExecutor is NonblockingLzApp {
    uint public counter;
    event IncrementCounterMessage(uint16 first, bytes second, uint64 third, bytes fourth);

    constructor(address _lzEndpoint) NonblockingLzApp(_lzEndpoint) {}

    function _nonblockingLzReceive(uint16 first, bytes memory second, uint64 third, bytes memory fourth) internal override {
        // _nonblockingLzReceive is how we provide custom logic to lzReceive()
        // in this case, increment a counter when a message is received.
        counter += 1;
        emit IncrementCounterMessage(first, second, third, fourth);
    }

    function incrementCounter(uint16 _dstChainId) public payable {
        // _lzSend calls endpoint.send()
        _lzSend(_dstChainId, bytes(""), payable(msg.sender), address(0x0), bytes(""), msg.value);
    }
}
