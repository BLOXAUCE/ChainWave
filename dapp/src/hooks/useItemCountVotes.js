import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const useItemCountVotes = (votingExecutorId, itemID, voteValue) => {
  const [listVotesCount, setListVotesCount] = useState(0);
  const [loadingVotesCount, setLoadingVotesCount] = useState(false);
  const APIURL =
    "https://api.studio.thegraph.com/query/51091/hack-voteem/version/latest";

  const GET_PROPOSAL_RECORDS = gql`
    query GetProposalRecords(
      $votingExecutorId: String!
      $itemID: String!
      $voteValue: Boolean!
    ) {
      proposeRecords: voteRecordeds(
        where: {
          VotingExecutor_id: $votingExecutorId
          optionId: $itemID
          vote: $voteValue
        }
      ) {
        id
        VotingExecutor_id
        optionId
        voter
        vote
      }
    }
  `;

  useEffect(() => {
    setLoadingVotesCount(true);
    fetchListVotesCount();
  }, [votingExecutorId, itemID, voteValue]);

  const fetchListVotesCount = async () => {
    const client = new ApolloClient({
      uri: APIURL,
      cache: new InMemoryCache(),
    });

    try {
      const response = await client.query({
        query: GET_PROPOSAL_RECORDS,
        variables: { votingExecutorId, itemID, voteValue }, // Pass the variable to the query
      });
      setListVotesCount(response.data.proposeRecords.length);
      setLoadingVotesCount(false);
    } catch (error) {
      console.log("Error fetching data: ", error);
      setLoadingVotesCount(false);
    }
  };

  return listVotesCount;
};

export default useItemCountVotes;
