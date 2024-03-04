import UserService from "../services/UserService.js";
import { StatusCodes } from "http-status-codes";

const CreateUser = async (req, res, next) => {
  try {
    const user = req.body;
    const usercookie = await UserService.CreateUser(user);
    res.status(StatusCodes.CREATED).json(usercookie);
  } catch (error) {
    next(error);
  }
};

const LogInUser = async (req, res, next) => {
  try {
    const user = req.body;
    const usercookie = await UserService.LogInUser(user);
    res.status(StatusCodes.OK).json(usercookie);
  } catch (error) {
    next(error);
  }
};

const CheckUserNameExists = async (req, res, next) => {
  try {
    const name = req.params.name;
    const doesNameExist = await UserService.CheckUserNameExists(name);
    res.status(StatusCodes.OK).json(doesNameExist);
  } catch (error) {
    next(error);
  }
};

const GetUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserService.GetUserById(id);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const CheckUserAdmin = async (req, res, next) => {
  try {
    res
      .status(StatusCodes.OK)
      .send(req.user.isAdmin);
  } catch (error) {
    next(error);
  }
};

const GetUsers = async (req, res, next) => {
  try {
    const name = req.params.name;
    const users = await UserService.GetUsers();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    next(error);
  }
};

const DeleteUser = async (req, res, next) => {
  try {
    const name = req.params.name;
    if (req.user.isAdmin) {
      const user = await UserService.DeleteUser(name);
      res.status(StatusCodes.OK).json(user);
    } else {
      res.status(StatusCodes.FORBIDDEN).json(false);
    }
  } catch (error) {
    next(error);
  }
};

export default {
  CreateUser,
  LogInUser,
  CheckUserNameExists,
  CheckUserAdmin,
  GetUsers,
  GetUserById,
  DeleteUser,
};
