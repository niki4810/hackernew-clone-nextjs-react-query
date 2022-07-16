import { useMutation } from "react-query";
import { useRouter } from "next/router";
import CreateLink from "../components/create-link";
import { useEffect } from "react";
import {isLoggedIn} from "../components/constants";

const CREATE_LINK_MUTATION = `
mutation PostMutation(
    $description: String!
    $url: String!
  ) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

export default function Create() {
  const router = useRouter();
  const { mutate, data } = useMutation(
    async (variables) => {
      return fetch(`http://localhost:4000`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: CREATE_LINK_MUTATION,
          variables,
        }),
      });
    },
    {
      onSuccess: () => {
        router.push("/");
      },
    }
  );


  useEffect(() => {
    if(!isLoggedIn()) {
      router.push("/");
    }
  }, []);

  return <CreateLink handleSubmit={mutate} />;
}
