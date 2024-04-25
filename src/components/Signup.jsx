import React from "react";
import "../assets/Signup.css"

const Signup = () => {
    return (
        <>
        <div className="signup_container">
            <form action="submit" method="POST">
            <label for="Username">New Username:</label>
            <input type="text"></input>
            <label for="Password">Password:</label>
            <input type="password" ></input>
            <button type="submit">Create</button>
            </form>
            </div>
            </>
    );
}

export default Signup