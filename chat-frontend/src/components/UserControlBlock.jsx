import React from "react";
import "../styles/UserControlBlock.css";
import Swal from "sweetalert2";
import ConnectionService from "../services/ConnectionService.js";

const UserControlBlock = (props) => {

  const deleteUser = () => {
    if (props.user.isAdmin) {
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        ConnectionService.RequestUserDeletion(props.user.name).then(
          (response) => {
            if (response) {
              Swal.fire(
                "Deleted!",
                `User ${props.user.name} has been deleted.`,
                "success"
              ).then(() => {
                window.location.reload();
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              }).then(() => {
                window.location.reload();
              });
            }
          }
        );
      }
    });
  };

  return (
    <div className="user-control-block flex flex-row justify-between">
      <p className="text-3xl ml-2 my-3 header">{props.user.name}</p>
      <button
        className={`btn delete-btn ${props.user.isAdmin ? "admin-btn" : ""}`}
        onClick={deleteUser}
      >
        {props.user.isAdmin ? "ADMIN" : "DELETE"}
      </button>
    </div>
  );
};

export default UserControlBlock;
