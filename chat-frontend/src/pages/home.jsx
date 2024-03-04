import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ConnectionServices from "../services/ConnectionService.js";
import "../styles/home.css";
import NavBar from "../components/navbar.jsx";
import Message from "../components/message.jsx";
import { socket } from "../services/WebsocketService.js";
import Swal from "sweetalert2";

const Home = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    ConnectionServices.RequestAllMessages().then((requestedMessages) => {
      if (requestedMessages === false) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setMessages(requestedMessages);
      }
    });
  }, []);

  const scrollToLastMessage = () => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setTimeout(scrollToLastMessage, 300);
  }, [messages]);

  useEffect(() => {
    socket.connect();

    socket.on("receiveMessage", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.length > 0) {
      ConnectionServices.RequestMessageSend(message).then((messageId) => {
        if (messageId !== false) {
          socket.emit("sendMessage", messageId);
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
