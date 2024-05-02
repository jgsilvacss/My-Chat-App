import React from "react";

const MessageCard = ({ message }) => {
  // Create a new Date object from the timestamp
  const createdAt = new Date(message.created_at);

  // Get the hours, minutes, and seconds from the timestamp
  const hours = createdAt.getHours().toString().padStart(2, "0");
  const minutes = createdAt.getMinutes().toString().padStart(2, "0");
  const seconds = createdAt.getSeconds().toString().padStart(2, "0");

  // Combine hours, minutes, and seconds into a time string
  const time = `${hours}:${minutes}:${seconds}`;

  return (
    <div className="message-card">
      <p>
        <strong>{message.username}: </strong>
        <br />
        {message.content}
        <br />
        {time}
      </p>
    </div>
  );
};

export default MessageCard;
