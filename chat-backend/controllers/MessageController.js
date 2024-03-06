import MessageService from "../services/MessageService.js";
import { StatusCodes } from "http-status-codes";
import { io } from "../index.js";

const PostMessage = async (req, res, next) => {
  try {
    const user = req.user;
    const message = req.body.message;
    const returnedMessage = await MessageService.CreateMessage(message, user);
    io.sockets.emit("message", returnedMessage);
    res.status(StatusCodes.OK).json(returnedMessage._id);
  } catch (error) {
    next(error);
  }
};

const GetMessage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const message = await MessageService.GetMessageById(id);
    res.status(StatusCodes.OK).json(message);
  } catch (error) {
    next(error);
  }
};

const GetAllMessages = async (req, res, next) => {
  try {
    const messages = await MessageService.GetAllMessages();
    res.status(StatusCodes.OK).json(messages);
  } catch (error) {
    next(error);
  }
};

export default {
  GetMessage,
  PostMessage,
  GetAllMessages,
};
