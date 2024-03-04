import { StatusCodes } from "http-status-codes";

const ErrorHandler = (err, req, res, next) => {
  console.log(`Error: ${err.message}`);
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    name: err.name || "Internal Server Error",
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
};

export default ErrorHandler;
