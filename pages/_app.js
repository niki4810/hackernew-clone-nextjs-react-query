import "../styles/globals.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Header from "../components/header";
import React from "react";
import { AuthContextProvider } from "../components/auth-context";

const client = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <div className="flex flex-col h-full">
          <Header />
          <div className="py-4 px-4 bg-gray-100">
            <Component {...pageProps} />
          </div>
        </div>
      </AuthContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
