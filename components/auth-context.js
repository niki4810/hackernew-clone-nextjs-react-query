import React, { useContext, useState, useEffect } from "react";
import { AUTH_TOKEN, setAuthToken, removeAuthToken } from "./constants";

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const state = useState(null);
  useEffect(() => {
    state[1](localStorage.getItem(AUTH_TOKEN));
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAuthToken = () => {
  const [authToken] = useContext(AuthContext);
  return authToken;
};

export const useLogin = () => {
  const [_, setAuthTokenState] = useContext(AuthContext);
  return (token) => {
    setAuthTokenState(token);
    setAuthToken(token);
  };
};

export const useLogout = () => {
  const [_, setAuthTokenState] = useContext(AuthContext);
  return () => {
    setAuthTokenState(null);
    removeAuthToken();
  };
};
