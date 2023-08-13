import {
  MessageFailed as MessageFailedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  ProposalCreated as ProposalCreatedEvent,
  RetryMessageSuccess as RetryMessageSuccessEvent,
  SetMinDstGas as SetMinDstGasEvent,
  SetPrecrime as SetPrecrimeEvent,
  SetTrustedRemote as SetTrustedRemoteEvent,
  SetTrustedRemoteAddress as SetTrustedRemoteAddressEvent,
  VoteRecorded as VoteRecordedEvent,
  VoteSent as VoteSentEvent,
} from "../generated/VotingExecutor/VotingExecutor";
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
  VoteSent,
} from "../generated/schema";

export function handleMessageFailed(event: MessageFailedEvent): void {
  let entity = new MessageFailed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._srcChainId = event.params._srcChainId;
  entity._srcAddress = event.params._srcAddress;
  entity._nonce = event.params._nonce;
  entity._payload = event.params._payload;
  entity._reason = event.params._reason;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleProposalCreated(event: ProposalCreatedEvent): void {
  let entity = new ProposalCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.VotingExecutor_id = event.params.id;
  entity.format = event.params.format;
  entity.root = event.params.root;
  entity.deadline = event.params.deadline;
  entity.optionsLength = event.params.optionsLength;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRetryMessageSuccess(
  event: RetryMessageSuccessEvent
): void {
  let entity = new RetryMessageSuccess(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._srcChainId = event.params._srcChainId;
  entity._srcAddress = event.params._srcAddress;
  entity._nonce = event.params._nonce;
  entity._payloadHash = event.params._payloadHash;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSetMinDstGas(event: SetMinDstGasEvent): void {
  let entity = new SetMinDstGas(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._dstChainId = event.params._dstChainId;
  entity._type = event.params._type;
  entity._minDstGas = event.params._minDstGas;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSetPrecrime(event: SetPrecrimeEvent): void {
  let entity = new SetPrecrime(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.precrime = event.params.precrime;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSetTrustedRemote(event: SetTrustedRemoteEvent): void {
  let entity = new SetTrustedRemote(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._remoteChainId = event.params._remoteChainId;
  entity._path = event.params._path;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSetTrustedRemoteAddress(
  event: SetTrustedRemoteAddressEvent
): void {
  let entity = new SetTrustedRemoteAddress(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._remoteChainId = event.params._remoteChainId;
  entity._remoteAddress = event.params._remoteAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleVoteRecorded(event: VoteRecordedEvent): void {
  let entity = new VoteRecorded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.VotingExecutor_id = event.params.id;
  entity.optionId = event.params.optionId;
  entity.voter = event.params.voter;
  entity.vote = event.params.vote;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleVoteSent(event: VoteSentEvent): void {
  let entity = new VoteSent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.proposalId = event.params.proposalId;
  entity.optionId = event.params.optionId;
  entity.voter = event.params.voter;
  entity.vote = event.params.vote;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
