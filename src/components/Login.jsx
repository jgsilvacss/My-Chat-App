import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "../assets/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const extractUserIdFromToken = (token) => {
    if (!token) {
      return null;
    }

    const tokenParts = token.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));
    const userId = payload.userId;

    return userId;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      const response = await fetch(`https://my-chat-application-c4c6dbd08d67.herokuapp.com/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }
      const data = await response.json();
      const userId = extractUserIdFromToken(data.token);

      document.cookie = `token=${data.token}; path=/; max-age=${60 * 60}`;
      document.cookie = `id=${userId}; path=/; max-age=${60 * 60}`;

      setUsername("");
      setPassword("");

      navigate(`/lobbies/${userId}`);

    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  };
  return (
    <>
      <div className="login_container">
        <form onSubmit={handleSubmit} method="post">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button> Login</button>
          <Link to="/signup">Not registered yet ? Click on this link !</Link>
        </form>
      </div>
    </>
  );
};

export default Login;