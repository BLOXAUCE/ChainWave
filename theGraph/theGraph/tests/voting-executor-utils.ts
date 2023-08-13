import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  MessageFailed,
  OwnershipTransferred,
  ProposalCreated,
  RetryMessageSuccess,
  SetMinDstGas,
  SetPrecrime,
  SetTrustedRemote,
  SetTrustedRemoteAddress,
  VoteRecorded,
  VoteSent
} from "../generated/VotingExecutor/VotingExecutor"

export function createMessageFailedEvent(
  _srcChainId: i32,
  _srcAddress: Bytes,
  _nonce: BigInt,
  _payload: Bytes,
  _reason: Bytes
): MessageFailed {
  let messageFailedEvent = changetype<MessageFailed>(newMockEvent())

  messageFailedEvent.parameters = new Array()

  messageFailedEvent.parameters.push(
    new ethereum.EventParam(
      "_srcChainId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_srcChainId))
    )
  )
  messageFailedEvent.parameters.push(
    new ethereum.EventParam(
      "_srcAddress",
      ethereum.Value.fromBytes(_srcAddress)
    )
  )
  messageFailedEvent.parameters.push(
    new ethereum.EventParam("_nonce", ethereum.Value.fromUnsignedBigInt(_nonce))
  )
  messageFailedEvent.parameters.push(
    new ethereum.EventParam("_payload", ethereum.Value.fromBytes(_payload))
  )
  messageFailedEvent.parameters.push(
    new ethereum.EventParam("_reason", ethereum.Value.fromBytes(_reason))
  )

  return messageFailedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createProposalCreatedEvent(
  id: BigInt,
  format: i32,
  root: Bytes,
  deadline: BigInt,
  optionsLength: i32
): ProposalCreated {
  let proposalCreatedEvent = changetype<ProposalCreated>(newMockEvent())

  proposalCreatedEvent.parameters = new Array()

  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "format",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(format))
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam("root", ethereum.Value.fromFixedBytes(root))
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "deadline",
      ethereum.Value.fromUnsignedBigInt(deadline)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "optionsLength",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(optionsLength))
    )
  )

  return proposalCreatedEvent
}

export function createRetryMessageSuccessEvent(
  _srcChainId: i32,
  _srcAddress: Bytes,
  _nonce: BigInt,
  _payloadHash: Bytes
): RetryMessageSuccess {
  let retryMessageSuccessEvent = changetype<RetryMessageSuccess>(newMockEvent())

  retryMessageSuccessEvent.parameters = new Array()

  retryMessageSuccessEvent.parameters.push(
    new ethereum.EventParam(
      "_srcChainId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_srcChainId))
    )
  )
  retryMessageSuccessEvent.parameters.push(
    new ethereum.EventParam(
      "_srcAddress",
      ethereum.Value.fromBytes(_srcAddress)
    )
  )
  retryMessageSuccessEvent.parameters.push(
    new ethereum.EventParam("_nonce", ethereum.Value.fromUnsignedBigInt(_nonce))
  )
  retryMessageSuccessEvent.parameters.push(
    new ethereum.EventParam(
      "_payloadHash",
      ethereum.Value.fromFixedBytes(_payloadHash)
    )
  )

  return retryMessageSuccessEvent
}

export function createSetMinDstGasEvent(
  _dstChainId: i32,
  _type: i32,
  _minDstGas: BigInt
): SetMinDstGas {
  let setMinDstGasEvent = changetype<SetMinDstGas>(newMockEvent())

  setMinDstGasEvent.parameters = new Array()

  setMinDstGasEvent.parameters.push(
    new ethereum.EventParam(
      "_dstChainId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_dstChainId))
    )
  )
  setMinDstGasEvent.parameters.push(
    new ethereum.EventParam(
      "_type",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_type))
    )
  )
  setMinDstGasEvent.parameters.push(
    new ethereum.EventParam(
      "_minDstGas",
      ethereum.Value.fromUnsignedBigInt(_minDstGas)
    )
  )

  return setMinDstGasEvent
}

export function createSetPrecrimeEvent(precrime: Address): SetPrecrime {
  let setPrecrimeEvent = changetype<SetPrecrime>(newMockEvent())

  setPrecrimeEvent.parameters = new Array()

  setPrecrimeEvent.parameters.push(
    new ethereum.EventParam("precrime", ethereum.Value.fromAddress(precrime))
  )

  return setPrecrimeEvent
}

export function createSetTrustedRemoteEvent(
  _remoteChainId: i32,
  _path: Bytes
): SetTrustedRemote {
  let setTrustedRemoteEvent = changetype<SetTrustedRemote>(newMockEvent())

  setTrustedRemoteEvent.parameters = new Array()

  setTrustedRemoteEvent.parameters.push(
    new ethereum.EventParam(
      "_remoteChainId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_remoteChainId))
    )
  )
  setTrustedRemoteEvent.parameters.push(
    new ethereum.EventParam("_path", ethereum.Value.fromBytes(_path))
  )

  return setTrustedRemoteEvent
}

export function createSetTrustedRemoteAddressEvent(
  _remoteChainId: i32,
  _remoteAddress: Bytes
): SetTrustedRemoteAddress {
  let setTrustedRemoteAddressEvent = changetype<SetTrustedRemoteAddress>(
    newMockEvent()
  )

  setTrustedRemoteAddressEvent.parameters = new Array()

  setTrustedRemoteAddressEvent.parameters.push(
    new ethereum.EventParam(
      "_remoteChainId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_remoteChainId))
    )
  )
  setTrustedRemoteAddressEvent.parameters.push(
    new ethereum.EventParam(
      "_remoteAddress",
      ethereum.Value.fromBytes(_remoteAddress)
    )
  )

  return setTrustedRemoteAddressEvent
}

export function createVoteRecordedEvent(
  id: BigInt,
  optionId: BigInt,
  voter: Address,
  vote: boolean
): VoteRecorded {
  let voteRecordedEvent = changetype<VoteRecorded>(newMockEvent())

  voteRecordedEvent.parameters = new Array()

  voteRecordedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  voteRecordedEvent.parameters.push(
    new ethereum.EventParam(
      "optionId",
      ethereum.Value.fromUnsignedBigInt(optionId)
    )
  )
  voteRecordedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  voteRecordedEvent.parameters.push(
    new ethereum.EventParam("vote", ethereum.Value.fromBoolean(vote))
  )

  return voteRecordedEvent
}

export function createVoteSentEvent(
  proposalId: BigInt,
  optionId: i32,
  voter: Address,
  vote: boolean
): VoteSent {
  let voteSentEvent = changetype<VoteSent>(newMockEvent())

  voteSentEvent.parameters = new Array()

  voteSentEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )
  voteSentEvent.parameters.push(
    new ethereum.EventParam(
      "optionId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(optionId))
    )
  )
  voteSentEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  voteSentEvent.parameters.push(
    new ethereum.EventParam("vote", ethereum.Value.fromBoolean(vote))
  )

  return voteSentEvent
}
