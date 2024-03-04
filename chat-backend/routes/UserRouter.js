import express from "express";
import UserController from "../controllers/UserController.js";
import { checkToken } from "../middleware/AuthMiddleware.js";

const Router = express.Router();

//login
Router.post("/", UserController.LogInUser);

Router.post("/register", UserController.CreateUser);

Router.get("/exists/:name", UserController.CheckUserNameExists);

Router.post("/is_admin", checkToken, UserController.CheckUserAdmin);

Router.get("/", checkToken, UserController.GetUsers);

Router.get("/:id", checkToken, UserController.GetUserById);

Router.delete("/:name", checkToken, UserController.DeleteUser);

export default Router;
