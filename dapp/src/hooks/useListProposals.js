import { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const useListProposal = () => {
  const [listProposals, setListProposals] = useState([]);
  const [loadingProposals, setLoadingProposals] = useState(false);
  const APIURL =
    "https://api.studio.thegraph.com/query/51091/hack-voteem/version/latest";

  useEffect(() => {
    const GET_PROPOSAL_CREATEDS = gql`
    query {
      proposalCreateds {
        id
        VotingExecutor_id
        format
        root
        deadline
        optionsLength
      }
    }
  `;
  
    const fetchListProposals = async () => {
      const client = new ApolloClient({
        uri: APIURL,
        cache: new InMemoryCache(),
      });
  
      try {
        const response = await client.query({
          query: GET_PROPOSAL_CREATEDS,
        });
  
        console.log(response.data.proposalCreateds);
        setListProposals(response.data.proposalCreateds);
        setLoadingProposals(false);
      } catch (error) {
        console.log("Error fetching data: ", error);
        setLoadingProposals(false);
      }
    };

    setLoadingProposals(true);
    fetchListProposals();
  }, []);

  return [loadingProposals, listProposals];
};

export default useListProposal;
