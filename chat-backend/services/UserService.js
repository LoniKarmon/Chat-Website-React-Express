import UserRepository from "../repositories/UserRepository.js";
import { createToken } from "../middleware/AuthMiddleware.js";
import CustomError from "../Errors/CustomError.js";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

const CreateUser = async (user) => {
  if (CheckUserInvalid(user)) {
    throw new CustomError(
      "AuthError",
      "User Format is Invalid",
      StatusCodes.BAD_REQUEST
    );
  } else if ((await GetUserByName(user.name)) !== null) {
    throw new CustomError(
      "AuthError",
      "User Already Exists",
      StatusCodes.BAD_REQUEST
    );
  } else {
    user.password = await HashPassword(user.password);
    return createToken(await UserRepository.CreateUser(user));
  }
};

const LogInUser = async (user) => {
  if (CheckUserInvalid(user)) {
    throw new CustomError(
      "AuthError",
      "User Format is Invalid",
      StatusCodes.BAD_REQUEST
    );
  } else {
    const WantedUser = await UserRepository.FindUserByName(user.name);
    if (
      WantedUser === null ||
      (await bcrypt.compare(user.password, WantedUser.password)) === false
    ) {
      throw new CustomError(
        "AuthError",
        "Name or Password is Incorrect",
        StatusCodes.BAD_REQUEST
      );
    } else {
      return createToken(WantedUser);
    }
  }
};

const GetUsers = async () => {
  const users = await UserRepository.GetUsers();
  return users.map((user) => {
    return {
      name: user.name,
      isAdmin: user.isAdmin,
    };
  });
};

const GetUserById = async (id) => {
  const user = await UserRepository.FindUserById(id);
  if (user === null) {
    return false;
  }
  return { name: user.name, isAdmin: user.isAdmin };
};

const DeleteUser = async (name) => {
  const user = await GetUserByName(name);

  if (user === null) {
    throw new CustomError(
      "AuthError",
      "User Does Not Exist",
      StatusCodes.BAD_REQUEST
    );
  }

  if (user.isAdmin) {
    throw new CustomError(
      "AuthError",
      "Cannot Delete Admin User",
      StatusCodes.EXPECTATION_FAILED
    );
  }

  return await UserRepository.DeleteUser(name);
};

const CheckUserNameExists = async (name) => {
  if ((await GetUserByName(name)) === null) {
    return true;
  } else {
    throw new CustomError(
      "AuthError",
      "User Already Exists",
      StatusCodes.EXPECTATION_FAILED
    );
  }
};

const CheckUserInvalid = (user) => {
  user?.password === undefined || user?.name === undefined
    ? true
    : CheckUserFormat(user);
};

const CheckUserFormat = (user) => {
  return (
    user.password.length < 6 ||
    user.name.length < 3 ||
    user.name.includes(" ") ||
    user.name.length > 18
  );
};

const GetUserByName = async (name) => {
  return await UserRepository.FindUserByName(name);
};

const HashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export default {
  CreateUser,
  LogInUser,
  CheckUserNameExists,
  GetUserByName,
  GetUsers,
  GetUserById,
  DeleteUser,
};
