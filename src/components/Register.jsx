import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StyledLink } from "./Header";
import AvatarPicker from "./AvatarPicker";
import { LoginContainer } from "./Login";

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

  const handleRegister = (event) => {
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

    fetch(REGISTER, options)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          try {
            console.log("try");
          } catch (error) {
            console.error(error);
          }
          navigate("/login");
        } else {
          setErrorMsg("Registration failed");
        }
      })
      .catch((error) => {
        console.error("error during login:", error);
      });
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
        <input
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Avatar"
          required
        />
        <AvatarPicker avatar={avatar} setAvatar={setAvatar} />
        <button onClick={handleRegister}>Register</button>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      </div>
      <StyledLink to="/login">I allready have an account</StyledLink>
    </LoginContainer>
  );
};

export default Register;
