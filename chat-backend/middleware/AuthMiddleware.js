import jwt from "jsonwebtoken";
import UserService from "../services/UserService.js";
import { StatusCodes } from "http-status-codes";

const checkToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Unauthorized" });
      }
      try {
        if (await UserService.CheckUserNameExists(decoded?.name)) {
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: "Unauthorized" });
        }
      } catch (err) {
        req.user = await UserService.GetUserByName(decoded.name);
        next();
      }
    });
  } else {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
};

const createToken = (user) => {
  const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET_KEY, {
    expiresIn: "12d",
  });
  return token;
};

const verifyToken = (token) => {
  if (token) {
    return jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      async (err, decoded) => {
        if (err) {
          return false;
        }
        try {
          await UserService.CheckUserNameExists(decoded.name);
          return false;
        } catch (err) {
          return decoded;
        }
      }
    );
  }
  return false;
};

export { checkToken, createToken, verifyToken };
