import React, { useState, useEffect } from "react";
import { useParams, useState } from "react-router-dom";
import MessageCard from "./MessageCard";

const MessagesList = ({ id, token }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async (lobbyId) => {
    try {
      setLoading(true);
      const response = await fetch(`https://my-chat-application-c4c6dbd08d67.herokuapp.com/lobby/${id}/${lobbyId}/get-message?limit=50`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          Token: token,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
  
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching messages:", error.message);
      setLoading(false);
    }
  };

  return (
    <div className="messages-container">
      <div className="messages-area">
        {loading && <p>Loading messages...</p>}
        {messages.map((message) => (
          <MessageCard key={message.id} message={message} />
        ))}
      </div>
      <div className="message-form">
        {/* Your message input and submit button */}
        <input type="text" placeholder="Type your message..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default MessagesList;
