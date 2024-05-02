import { useState, useEffect } from "react"; // Import useEffect

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../assets/Home.css";

const Home = () => {
  const location = useLocation();
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  // Use useEffect to update userId when location.state.userId changes
  useEffect(() => {
    setUserId(location.state ? location.state.userId : "");
  }, [location.state]);

  const handleTabClick = () => {
    console.log("clicked");
    navigate(`/lobbies/${userId}`);
    console.log(userId);
  };

  return (
    <>
      <div className="heading">
        <h1>Welcome To The LokkerRoom , Where to?</h1>
      </div>
      <div className="tabs-container">
        <button onClick={handleTabClick}>Lobbies</button>
        <button onClick={handleTabClick}>Chat</button>
      </div>
    </>
  );
};

export default Home;
