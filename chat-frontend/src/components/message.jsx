import React, { useState, useEffect } from "react";
import ConnectionService from "../services/ConnectionService.js";
import "../styles/message.css";

const Message = (props) => {
  const [user, setUser] = useState({});
  const time = new Date(props.message.time);

  useEffect(() => {
    ConnectionService.RequestUserById(props.message.user).then((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({ name: "Deleted User", isAdmin: false });
      }
    });
  }, []);

  return (
    <div className={`message flex flex-col mx-2 mb-1 ${user.isAdmin ? "admin-message" : ""}`}>
      <div className="message-header flex items-center">
        <span className="message-header-name">{user.name}</span>
        <span className="message-header-time ml-3 text-sm">
          {time.toLocaleString("he-IL")}
        </span>
      </div>
      <div className="message-body">
        <span className="message-body-text">{props.message.text}</span>
      </div>
    </div>
  );
};

export default Message;
