import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../authSlice";
import { StyledLink } from "./Header";
//import styled from "styled-components";

const GET_CSRF_TOKEN = "https://chatify-api.up.railway.app/csrf";
const REGISTER = "https://chatify-api.up.railway.app/auth/register";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  
  const navigate = useNavigate();

  //register - sen navigate login sida


  useEffect(() => {
    fetch(GET_CSRF_TOKEN, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        setToken(data.csrfToken);
        console.log(token)
      })
      .catch((error) => console.error("error CSRF token:", error));
  }, []);

  const handleRegister = (event) => {
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
        email: email,
        avatar: avatar,
        csrfToken: token,
      }),
    };
    fetch(REGISTER, options)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          try {
           console.log('try')
          } catch (error) {
            console.error("error decoding JWT:", error);
          }
          navigate("/login");
        } else {
          console.log('else')
        }
      })
      .catch((error) => {
        console.error("error during login:", error);
      });
  };


  return (
    <div>
      <h2>Register</h2>
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
          <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Avatar"
        />
        <button onClick={handleRegister}>Register</button>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>} 
      </div>
      <StyledLink to="/login">I allready have an account</StyledLink> 
    </div>
  );
};

export default Register;