import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import userApi from "../apis/userApi";
import { useDispatch } from "react-redux";

import { login } from "../store/userSlice";

function Login() {
  const dispatch = useDispatch();
  // create state variables for each input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Fields are required");
      return;
    }

    userApi
      .post("/auth/local", {
        identifier: email,
        password: password,
      })
      .then((response) => {
        // Handle success.
        // setLoggedIn(true);
        dispatch(login(response.data.user));
        history.push("/");
      })
      .catch((e) => {
        // Handle error.
        console.log("An error occurred:", e.response);
      });
  };

  return (
    <form
      className="flex flex-col justify-center p-2 m-4 space-y-2 align-middle border-2 border-gray-300 border-solid"
      onSubmit={handleSubmit}
    >
      <TextField
        fullWidth="true"
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className="dark:text-gray-300"
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error !== "" && (
        <Alert severity="error" onClick={() => setError(null)}>
          An error occurred!
          {error}
        </Alert>
      )}
      <div>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className="dark:bg-red-900"
        >
          Signup
        </Button>
      </div>
    </form>
  );
}

export default Login;
