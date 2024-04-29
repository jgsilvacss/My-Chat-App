import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://my-chat-application-c4c6dbd08d67.herokuapp.com/auth/signup",
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
        console.log("Signup successful:", responseData);
      } else {
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }

    console.log("Username:", username, "Password:", password);
  };

  return (
    <div className="signup_container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="Username">New Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="Password">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default Signup;
