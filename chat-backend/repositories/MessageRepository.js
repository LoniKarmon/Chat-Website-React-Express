import Message from "../models/MessageModel.js";

const CreateMessage = (message, user) => {
  return Message.create({ text: message, user: user });
};

const FindMessageById = (id) => {
  return Message.findById(id);
};

const GetAllMessages = () => {
  return Message.find();
};

export default {
  CreateMessage,
  FindMessageById,
  GetAllMessages,
};
