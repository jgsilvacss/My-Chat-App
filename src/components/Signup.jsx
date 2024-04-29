import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/Signup.css";

const Signup = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('https://my-chat-application-c4c6dbd08d67.herokuapp.com/auth/signup', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      if (response.ok) {
        // Handle successful signup (e.g., redirect to login or dashboard)
        console.log('Signup successful!');
        // ... your success logic
      } else {
        const errorData = await response.json(); // Assuming server sends JSON error
        console.error('Signup failed:', errorData); 
        // Handle signup error (e.g., display error message)
      }
    } catch (error) {
      console.error('Error during signup:', error);
      // Handle network errors or other client-side issues
    }
  
  
    console.log("Email:", email, "Password:", password); // Temporary
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
