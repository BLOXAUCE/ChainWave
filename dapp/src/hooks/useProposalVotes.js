import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const useProposalVotes = (votingExecutorId) => {
  const [listVotes, setListVotes] = useState([]);
  const [loadingVotes, setLoadingVotes] = useState(false);
  const APIURL =
    "https://api.studio.thegraph.com/query/51091/hack-voteem/version/latest";

  useEffect(() => {
    const GET_PROPOSAL_RECORDS = gql`
    query GetProposalRecords($votingExecutorId: String!) {
      proposeRecords: voteRecordeds(
        where: { VotingExecutor_id: $votingExecutorId }
      ) {
        id
        VotingExecutor_id
        optionId
        voter
        vote
      }
    }
  `;
  
    const fetchListVotes = async () => {
      const client = new ApolloClient({
        uri: APIURL,
        cache: new InMemoryCache(),
      });
  
      try {
        const response = await client.query({
          query: GET_PROPOSAL_RECORDS,
          variables: { votingExecutorId }, // Pass the variable to the query
        });
        setListVotes(response.data.proposeRecords);
        setLoadingVotes(false);
      } catch (error) {
        console.log("Error fetching data: ", error);
        setLoadingVotes(false);
      }
    };

    setLoadingVotes(true);
    fetchListVotes();
  }, [votingExecutorId]);

  return [loadingVotes, listVotes];
};

export default useProposalVotes;
