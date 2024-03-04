import MessageRepository from "../repositories/MessageRepository.js";
import CustomError from "../Errors/CustomError.js";
import { StatusCodes } from "http-status-codes";

const CreateMessage = async (message, user) => {
  if (!CheckMessage(message)) {
    return await MessageRepository.CreateMessage(message, user);
  } else {
    throw new CustomError(
      "MessageError",
      "Message Format is Invalid",
      StatusCodes.BAD_REQUEST
    );
  }
};

const GetMessageById = async (id) => {
  return await MessageRepository.FindMessageById(id);
};

const GetAllMessages = async () => {
  return MessageRepository.GetAllMessages();
}

const CheckMessage = (message) => {
  return message === null || message === undefined || message === "";
};

export default {
  CreateMessage,
  GetMessageById,
  GetAllMessages,
};
