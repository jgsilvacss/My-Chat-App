import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../assets/Signup.css";

const Lobbies = () => {
  const { id } = useParams();
  const [lobbies, setLobbies] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Extract token from cookies
    const cookiesArray = document.cookie.split(";");
    cookiesArray.forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");
      if (name === "token") {
        setToken(value);
      }
    });
  }, []);

  useEffect(() => {
    if (token) {
      // Fetch lobby data
      const fetchLobby = async () => {
        try {
            console.log("About to fetch lobbies, token:", token)
          const response = await fetch(`https://my-chat-application-c4c6dbd08d67.herokuapp.com/lobby/${id}/get-lobby`, {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${token}`,
              Token: token,
            },
            
          });

          console.log("Raw lobby response:", response)

          if (!response.ok) {
            throw new Error("Failed to fetch lobby");
          }

          const data = await response.json();
          setLobbies(data);
        } catch (error) {
          console.error("Error fetching lobby:", error.message);
        }
      };

      fetchLobby();
    }
  }, [id, token]);

  // Log lobbies when it changes
  useEffect(() => {
    console.log(lobbies);
  }, [lobbies]);

  return (
    <>
      <div className="lobby-container">
        {lobbies ? ( // Check if lobbies exists before mapping
          lobbies.map((lobby) => (
            <div key={lobby.lobby_id} className="lobby"> {/* Changed to lobby_id for uniqueness */}
              <h3>{lobby.name}</h3>
            </div>
          ))
        ) : (
          <p>Loading lobbies...</p> // Display a loading message
        )}
      </div>
    </>
  );

}

export default Lobbies;
