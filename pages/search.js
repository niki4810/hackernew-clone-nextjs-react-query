import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchWithAuth } from "../components/constants";
import LinkList from "../components/link-list";

const FEED_SEARCH_QUERY = `
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

async function fetchFeedsWithFilter({ queryKey, signal }) {
  try {
    const [_, filter] = queryKey;
    // Sleep for a second to allow previous query to cancel
    await new Promise((resolve) => setTimeout(resolve, 500));
    const resp = await fetchWithAuth("http://localhost:4000", {
      signal,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: FEED_SEARCH_QUERY,
        variables: { filter },
      }),
    });
    const { data } = await resp.json();
    return data.feed.links;
  } catch (e) {
    throw new Error(e);
  }
}

export default function Search() {
  const [searchFilter, setSearchFilter] = useState("");
  const controller = new AbortController();
  const { signal } = controller;
  const queryInfo = useQuery(
    ["feeds-search", searchFilter],
    fetchFeedsWithFilter,
    {
      enabled: searchFilter != null && searchFilter !== "",
      signal,
    }
  );

  return (
    <>
      <div className="flex gap-2 items-center">
        Search
        <input type="text" onChange={(e) => setSearchFilter(e.target.value)} />
        {/* <button>OK</button> */}
      </div>
      {queryInfo.isLoading ? <div className="my-2">Loading ...</div> : null}
      {queryInfo.data && queryInfo.data.length > 0 ? (
        <LinkList links={queryInfo.data} />
      ) : null}
    </>
  );
}
