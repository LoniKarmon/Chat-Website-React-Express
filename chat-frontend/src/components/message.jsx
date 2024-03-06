import React, { useState, useEffect } from "react";
import ConnectionService from "../services/ConnectionService.js";
import "../styles/message.css";

const Message = (props) => {
  const time = new Date(props.message.time);

  return (
    <div
      className={`message flex flex-col mx-2 mb-1 ${
        props.message.user?.isAdmin ? "admin-message" : ""
      }`}
    >
      <div className="message-header flex items-center">
        <span className="message-header-name italic">{`${
          props.message.user?.name ? props.message.user?.name : "Deleted User"
        }`}</span>
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
