import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConnectionServices from "../services/ConnectionService.js";
import "../styles/login.css";
import Swal from "sweetalert2";

const Login = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const isRegister = props.register === "true";
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const onLogin = () => {
    if (name === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Name is required",
      });
      return;
    }

    if (password === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password is required",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 6 characters",
      });
      return;
    }

    if (name.length < 3) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Name must be at least 3 characters",
      });
      return;
    }

    if (name.includes(" ")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Name cannot contain spaces",
      });
      return;
    }

    if (name.length > 18) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Name must be at least 18 characters",
      });
      return;
    }

    if (isRegister) {
      ConnectionServices.RequestNameCheck(name).then((isNameAvailable) => {
        if (!isNameAvailable) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Name is taken",
          });
          return;
        }
        ConnectionServices.RequestRegister(name, password).then((response) => {
          if (response) {
            navigate("/");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Invalid username or password",
            });
          }
        });
      });
    } else {
      ConnectionServices.RequestLogin(name, password).then((response) => {
        if (response) {
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid username or password",
          });
        }
      });
    }
  };

  return (
    <div className="login flex place-content-center items-center">
      <div className="login-wrapper flex items-center flex-col place-content-center">
        <h1 className="mb-6 text-3xl header">
          {isRegister ? "Sign Up for Chat" : "Log into Chat"}
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin(name, password);
          }}
          className="container flex items-center flex-col"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="User Name"
            className="mb-3 pl-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mb-3 px-2"
          />
          <div className="button-container flex justify-between">
            <button
              type="submit"
              className=" btn text-nowrap text-center text-xl py-2"
            >
              {isRegister ? "Sign Up" : "Log In"}
            </button>
            <button
              type="button"
              className="hollow-btn text-nowrap text-center text-xl py-2"
              onClick={() => {
                navigate(isRegister ? "/login" : "/register");
              }}
            >
              {isRegister ? "Back" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
