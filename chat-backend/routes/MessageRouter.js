import express from "express";
import MessageController from "../controllers/MessageController.js";


const Router = express.Router();

Router.post("/", MessageController.PostMessage);

Router.get("/:id", MessageController.GetMessage);

Router.get("/", MessageController.GetAllMessages);

export default Router;