import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const LobbiesList = ({ fetchMessages }) => {
  const { id } = useParams();
  const [lobbies, setLobbies] = useState([]);
  const [loading, setLoading] = useState(false);
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
          setLoading(true);
          const response = await fetch(`https://my-chat-application-c4c6dbd08d67.herokuapp.com/lobby/${id}/get-lobby`, {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${token}`,
              Token: token,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch lobby");
          }

          const data = await response.json();
          setLobbies(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching lobby:", error.message);
          setLoading(false);
        }
      };

      fetchLobby();
    }
  }, [id, token, fetchMessages]);

  return (
    <div className="lobbies-column">
      {loading && <p>Loading...</p>}
      {lobbies &&
        lobbies.map((lobby) => (
          <div
            key={lobby.lobby_id}
            className="lobby"
            onClick={() => fetchMessages(lobby.lobby_id)}
          >
            <h3>{lobby.name}</h3>
          </div>
        ))}
    </div>
  );
};

export default LobbiesList;
