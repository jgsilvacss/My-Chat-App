import React from "react";

const MessageCard = ({ message }) => (
  <div className="message-card">
    <p>
      <strong>{message.username}: </strong>
      {message.content}
      <br />
      Created At: {message.created_at} {/* Wrap created_at with curly braces */}
    </p>
  </div>
);

export default MessageCard;
