import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ConnectionService from "../services/ConnectionService.js";
import "../styles/admin.css";
import UserControlBlock from "../components/UserControlBlock.jsx";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to login first!",
      });
    }

    ConnectionService.RequestAdminCheck().then((response) => {
      if (!response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You don't have access to this page!",
        });
        navigate("/");
      }
    });

    ConnectionService.RequestUsers().then((response) => {
      setUsers(response);
    });
  }, []);

  return (
    <div className="AdminPage">
      <NavBar />
      <div className="Admin">
        <div className="admin-wrapper">
          <h1>Chat Admin Panel</h1>
          <input
            type="text"
            className="search-users mb-3 pl-2"
            placeholder="Search users"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
          {users
            .filter((user) => {
              return user.name.toLowerCase().includes(filter.toLowerCase());
             })
            .map((currUser) => {
              return <UserControlBlock user={currUser} key={currUser.name} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
