import User from "../models/UserModel.js";

const CreateUser = (user) => {
  return User.create({ name: user.name, password: user.password });
};

const FindUser = (user) => {
  return User.findOne({ name: user.name, password: user.password });
};

const FindUserByName = (name) => {
  return User.findOne({ name: name });
};

const FindUserById = (id) => {
  return User.findById(id);
};

const GetUsers = () => {
  return User.find();
};

const DeleteUser = (name) => {
  return User.deleteOne({ name: name });
};

export default {
  FindUserByName,
  FindUserById,
  CreateUser,
  FindUser,
  GetUsers,
  DeleteUser,
};
