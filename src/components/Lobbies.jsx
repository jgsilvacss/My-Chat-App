import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MessagesList from "./MessagesList";
import "../assets/Lobbies.css";

const Lobbies = () => {
  const { id } = useParams();
  const [lobbies, setLobbies] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [currentLobbyID, setCurrentLobbyID] = useState(null);

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
          const response = await fetch(
            `https://my-chat-application-c4c6dbd08d67.herokuapp.com/lobby/${id}/get-lobby`,
            {
              method: "GET",
              credentials: "include",
              headers: {
                Authorization: `Bearer ${token}`,
                Token: token,
              },
            }
          );

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
  }, [id, token]);

  const fetchMessages = async (lobbyId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://my-chat-application-c4c6dbd08d67.herokuapp.com/lobby/${id}/${lobbyId}/get-message?limit=50`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
            Token: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();
      setMessages(data);
      setLoading(false);
      setCurrentLobbyID(lobbyId); // Set current lobby ID
    } catch (error) {
      console.error("Error fetching messages:", error.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `https://my-chat-application-c4c6dbd08d67.herokuapp.com/lobby/${id}/${currentLobbyID}/post_message`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Token: token,
          },
          body: JSON.stringify({ content: messageInput }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // After sending the message, refetch messages to update the list
      fetchMessages(currentLobbyID);
      setMessageInput(""); // Clear input field
    } catch (error) {
      console.error("Error sending message:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="chat-app">
        <div className="lobbies-column">
          {loading && <p>Loading...</p>}
          <h1>Lobbies</h1>
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
        <div className="messages-container">
          <MessagesList messages={messages} />
          <form className="message-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Lobbies;
