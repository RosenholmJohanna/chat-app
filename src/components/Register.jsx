import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StyledLink } from "./Header";
import AvatarPicker from "./AvatarPicker";
import { LoginContainer } from "./Login";
import { GET_CSRF_TOKEN, REGISTER_USER } from "../utils/api";




const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(GET_CSRF_TOKEN, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        setToken(data.csrfToken);
        console.log(data.csrfToken);
      })
      .catch((error) => console.error("error CSRF token:", error));
  }, []);

  const handleRegister = async (event) => {
    event.preventDefault();
    setErrorMsg(null);

    if (!username || !password || !email || !avatar) {
      setErrorMsg("All fields are required.");
      setTimeout(() => {
        setErrorMsg(null);
      }, 2000);
      return;
    }

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

    try {
      const response = await fetch(REGISTER_USER, options);
      const data = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        setErrorMsg(data.error); 
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMsg("An error occurred during registration. Please try again.");
    }
  };

  return (
    <LoginContainer>
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
        <p>Pick avatar</p>
        <AvatarPicker avatar={avatar} setAvatar={setAvatar} />
        <input
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Avatar"
          required
        />
        <button onClick={handleRegister}>Register</button>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      </div>
      <StyledLink to="/">I already have an account</StyledLink>
    </LoginContainer>
  );
};

export default Register;