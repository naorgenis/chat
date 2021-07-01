import React, { useRef, useEffect } from "react";
import Message from "./message";
import "./chat.css";

function Chat({ messages }) {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chatMessage-container">
      <ul className="messagesList">
        {messages.map((message) => (
          <li key={message.id} ref={messagesEndRef}>
            <Message {...message} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chat;
