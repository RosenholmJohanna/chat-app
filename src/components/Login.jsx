import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../authSlice";
import { decodeJwt } from "../utils/JwtDecode";
import { StyledLink } from "./Header";
import styled from "styled-components";
import { GET_CSRF_TOKEN, LOGIN_USER } from "../utils/api";



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

 

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
          if (token) {
            navigate("/messages");
          }
        } else {
          setErrorMsg("Invalid username or password");
          setPassword("");
          setUsername("");
        }
      })
      .catch((error) => {
        console.error("error during login:", error);
      });
  };


  return (
    <LoginContainer>
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
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      </div>
      <button onClick={handleLogin}>Login</button>
      <StyledLink to="/register">Not a user?Register new user account</StyledLink> 
    </LoginContainer>
  );
};

export default Login;

export const LoginContainer = styled.div`
 justify-content: center;
 color:black;
 font-size: 0.8em;
`
