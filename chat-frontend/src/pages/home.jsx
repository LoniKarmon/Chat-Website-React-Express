import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ConnectionServices from "../services/ConnectionService.js";
import { io } from "socket.io-client";
import "../styles/home.css";
import NavBar from "../components/navbar.jsx";
import Message from "../components/message.jsx";
import Swal from "sweetalert2";

const Home = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      ConnectionServices.RequestAllMessages().then((requestedMessages) => {
        if (requestedMessages !== false) {
          setMessages(requestedMessages);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
          localStorage.removeItem("token");
          navigate("/login");
        }
      });

      const URL = process.env.REACT_APP_SERVER_URL || "https://localhost:3000";

      const socket = io(URL, {
        query: { token: localStorage.getItem("token") },
      });

      socket.connect();

      socket.on("message", (message) => {
        if (message !== false) {
          setMessages((messages) => [...messages, message]);
        }
      });

      return () => {
        socket.disconnect();
      };
    }

  }, []);

  const scrollToLastMessage = () => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setTimeout(scrollToLastMessage, 300);
  }, [messages]);

  const sendMessage = () => {
    if (message.length > 0) {
      ConnectionServices.RequestMessageSend(message).then((messageId) => {
        if (messageId === false) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        } else {
        }
      });
    }
  };

  return (
    <div className="HomePage">
      <NavBar />
      <div className="Chat">
        <div className="chat-wrapper overflow-auto flex flex-col">
          {messages.map((message) => {
            return <Message message={message} key={message._id} />;
          })}
          <div className="dummy-div mb-14" ref={messageEndRef} />
          <form
            className="message-form flex"
            onSubmit={(e) => {
              e.preventDefault();
              e.target.reset();
              sendMessage();
            }}
          >
            <input
              id="messageInput"
              type="text"
              className="message-input px-2"
              placeholder="Type a message..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button className="message-button">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
