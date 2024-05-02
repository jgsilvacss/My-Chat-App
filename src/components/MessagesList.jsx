import React from "react";
import MessageCard from "./MessageCard";


const MessagesList = ({ messages }) => (
  <div className="messages-area">
    {messages.map((message) => (
      <MessageCard key={message.id} message={message} />
    ))}
  </div>
);

export default MessagesList;
