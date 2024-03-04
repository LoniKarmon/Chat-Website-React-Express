import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ConnectionService from "../services/ConnectionService";
import "../styles/navbar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleClick = () => {
    setShow((show % 2) + 1);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const adminRef = () => {
    navigate(`${location.pathname === "/" ? "/admin" : "/"}`)
  }

  ConnectionService.RequestAdminCheck().then((response) => {
    setIsAdmin(response);
  });

  return (
    <nav className="navbar flex flex-col">
      <button
        className="navbar-toggler my-4 mx-2 w-6"
        type="button"
        aria-label="Toggle navigation"
        onClick={handleClick}
      >
        <span className={`navbar-toggler-icon`}>
          <svg
            className={`w-6 h-6 nav-icon ${
              show === 0 ? "" : `${show === 1 ? "rotate" : "unrotate"}`
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 17 14"
          >
            <path d="M16 2H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 1 1 0 2Zm0 6H1a1 1 0 0 1 0-2h15a1 1 0 0 1 0 2Z" />
          </svg>
        </span>
      </button>

      <button
        className={`my-4 mx-2 w-6 logout-toggler-icon ${
          show === 0 ? "hidden" : `${show === 1 ? "show-nav" : "hide-nav"}`
        }`}
        onClick={Logout}
      >
        <span className={`navbar-toggler-icon`}>
          <svg
            className="w-6 h-6 nav-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
            />
          </svg>
        </span>
      </button>

      <button
        className={`my-4 mx-2 w-6 logout-toggler-icon ${
          show === 0 ? "hidden" : `${show === 1 ? "show-nav" : "hide-nav"}`
        } ${isAdmin ? "" : "hidden"}`}
        onClick={adminRef}
      >
        <span className={`navbar-toggler-icon`}>
          <svg
            className="w-6 h-6 nav-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="#f45b69"
            viewBox="0 0 20 20"
          >
            <path
              d={`${
                location.pathname !== "/"
                  ? "M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.546l3.2 3.659a1 1 0 0 0 1.506 0L13.454 14H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-8 10H5a1 1 0 0 1 0-2h5a1 1 0 1 1 0 2Zm5-4H5a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2Z"
                  : "m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
              }`}
            />
          </svg>
        </span>
      </button>
    </nav>
  );
};

export default NavBar;
