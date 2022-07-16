import { useQuery } from "react-query";
import LinkList from "../components/link-list";
import { fetchWithAuth } from "../components/constants";

const FEEDS_QUERY = `
query FetchFeeds {
  feed {
    links {
      id
      createdAt
      url
      description
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

async function fetchFeeds() {
  try {
    const resp = await fetchWithAuth("http://localhost:4000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: FEEDS_QUERY,
      }),
    });
    const { data } = await resp.json();
    return data.feed.links;
  } catch (e) {
    throw new Error(e);
  }
}
export default function Home() {
  const queryInfo = useQuery("feeds", fetchFeeds);

  if (queryInfo.isLoading) return "Loading ...";

  if (queryInfo.isError) return "Error ...";
  return <LinkList links={queryInfo.data} />;
}
