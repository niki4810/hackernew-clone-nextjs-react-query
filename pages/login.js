import { useMutation } from "react-query";
import LoginForm from "../components/login-form";
import { useRouter } from "next/router";
import { useLogin } from "../components/auth-context";
import { fetchWithAuth } from "../components/constants";
const SIGNUP_MUTATION = `
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = `
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default function Login() {
  const router = useRouter();
  const loginHander = useLogin();
  const { mutate: loginMutation, data: loginMutationData } = useMutation(
    async (variables) => {
      const resp = await fetchWithAuth(`http://localhost:4000`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: LOGIN_MUTATION,
          variables,
        }),
      });
      const data = await resp.json();
      return data.data.login;
    },
    {
      onSuccess: ({ token }) => {
        loginHander(token);
        router.push("/");
      },
    }
  );

  const { mutate: signUpMutation, data: signUpMutationData } = useMutation(
    async (variables) => {
      const resp = await fetchWithAuth(`http://localhost:4000`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: SIGNUP_MUTATION,
          variables,
        }),
      });
      const data = await resp.json();
      return data.data.signup;
    },
    {
      onSuccess: ({ token }) => {
        loginHander(token);
        router.push("/");
      },
    }
  );

  return (
    <LoginForm
      handleSubmit={({ action, data }) => {
        switch (action) {
          case "signup": {
            signUpMutation(data);
            break;
          }
          default: {
            const { email, password } = data;
            loginMutation({ email, password });
            break;
          }
        }
      }}
    />
  );
}
