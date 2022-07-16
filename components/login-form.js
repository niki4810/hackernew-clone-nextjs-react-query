import React, { useState, useEffect } from "react";

const LoginForm = ({ handleSubmit }) => {
  const [state, setState] = useState({
    name: "Nikhilesh Katakam",
    email: "nikhilesh.k@gmail.com",
    password: "Test1234!",
  });

  const [view, setView] = useState("login");

  return (
    <div className="p-8">
      <form
        className="flex flex-col gap-2"
        onSubmit={(ev) => {
          ev.preventDefault();
          handleSubmit({
              action: view,
              data: state
          });
        }}
      >
        <input
          className="mb-2"
          value={state.email}
          placeholder="Your email address"
          type="text"
          onChange={(ev) => {
            setState({
              ...state,
              email: ev.target.value,
            });
          }}
        />
        <input
          className="mb-2"
          value={state.password}
          placeholder="Choose a safe password"
          type="password"
          onChange={(ev) => {
            setState({
              ...state,
              password: ev.target.value,
            });
          }}
        />
        {view === "signup" ? (
          <input
            className="mb-2"
            value={state.name}
            placeholder="Your Full Name"
            type="text"
            onChange={(ev) => {
              setState({
                ...state,
                name: ev.target.value,
              });
            }}
          />
        ) : null}
        <div className="flex gap-4">
          <button type="submit" name="login" value="login">
            {view === "login" ? "Login" : "Signup"}
          </button>
          <button
            onClick={(ev) => {
              ev.preventDefault();
              setView((current) => {
                return current === "login" ? "signup" : "login";
              });
            }}
            name="switch-state"
            value="switch-state"
          >
            {view === "login" ? "Need an account?" : "Already have an account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
