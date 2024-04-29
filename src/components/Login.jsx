import React, { useState } from "react";
import "../assets/Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://my-chat-application-c4c6dbd08d67.herokuapp.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        document.cookie = `token=${data.token}; path=/; max-age=${60}`;
        navigate("/lobbies");
        console.log("Login successful:", data);
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
      }
    } catch (error) {
      console.error("Error during Login:", error);
    }

    console.log("Username:", username, "Password:", password);
  };

  return (
    <div className="login_container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <Link to="/signup">Haven't registered yet? Sign up here!</Link>
      </form>
    </div>
  );
};

export default Login;
