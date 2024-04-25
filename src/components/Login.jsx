import React from "react";
import "../assets/Login.css"
import {Link} from "react-router-dom"

const Login = () => {
    return (
        <>
        <div className="login_container">
            <form action="submit" method="POST">
            <label for="Username">New Username:</label>
            <input type="text"></input>
            <label for="Password">Password:</label>
            <input type="password" ></input>
            <button type="submit">LogIn</button>
            <Link to="/signup">Have not registered yet? Sign up here!</Link>
            </form>
            </div>
            </>
    );
}

export default Login