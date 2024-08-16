import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../authSlice";
import styled from "styled-components";

const GET_CSRF_TOKEN = "https://chatify-api.up.railway.app/csrf";
const LOGIN_USER = "https://chatify-api.up.railway.app/auth/token";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // JWT ? navigate/messages

  useEffect(() => {
    fetch(GET_CSRF_TOKEN, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        setToken(data.csrfToken);
      })
      .catch((error) => console.error("error CSRF token:", error));
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    setErrorMsg(null);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        csrfToken: token,
      }),
    };
    fetch(LOGIN_USER, options)
      .then((response) => response.json())
      .then((data) => {
        //console.log("JWT raw", data.token);
        if (data.token) {
          try {
            const decodedToken = decodeJwt(data.token);
            console.log("JWT decoded", decodedToken);
            dispatch(
              login({
                token: data.token,
                user: decodedToken,
              })
            );
          } catch (error) {
            console.error("error decoding JWT:", error);
          }
          navigate("/messages");
        } else {
          setErrorMsg("Invalid username or password");
          setPassword("");
          setUsername("");
          //data.message, error.message
        }
      })
      .catch((error) => {
        console.error("error during login:", error);
      });
  };

  const decodeJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error("invalid token");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button onClick={handleLogin}>Login</button>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      </div>
    </div>
  );
};

export default Login;
