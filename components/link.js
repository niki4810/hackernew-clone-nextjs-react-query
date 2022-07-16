import React from "react";
import { timeDifferenceForDate } from "./constants";
import { useAuthToken } from "./auth-context";
import { useMutation, useQueryClient } from "react-query";
import { fetchWithAuth } from "./constants";

const VOTE_MUTATION = `
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const Link = (props) => {
  const { link, index } = props;
  const authToken = useAuthToken();
  const queryClient = useQueryClient();
  const { mutate: voteMutation, data: voteMutationData } = useMutation(
    async (variables) => {
      return fetchWithAuth(`http://localhost:4000`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: VOTE_MUTATION,
          variables,
        }),
      });
    }, {
      onSettled: () => {
        queryClient.invalidateQueries("feeds");
      }
    }
  );
  return (
    <div className="flex mt-2 items-start">
      <div className="flex items-center">
        <span className="text-gray-500">{index + 1}.</span>
        {authToken ? (
          <div
            className="ml-1 text-gray-500 text-sm cursor-pointer"
            onClick={() => voteMutation({ linkId: link.id })}
          >
            ▲
          </div>
        ) : null}
      </div>
      <div className="ml-1">
        <div>
          {link.description} ({link.url})
        </div>
        {
          <div className="text-xs text-gray-500">
            {link.votes.length} votes | by{" "}
            {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        }
      </div>
    </div>
  );
};

export default Link;
