import express from "express";
import UserRouter from "./routes/UserRouter.js";
import MessageRouter from "./routes/MessageRouter.js";
import cors from "cors";
import ErrorHandler from "./middleware/ErrorMiddleware.js";
import dotenv from "dotenv";
import db from "./utils/db.js";
import { checkToken, verifyToken } from "./middleware/AuthMiddleware.js";
import { createServer } from "http";
import { Server } from "socket.io";
import MessageService from "./services/MessageService.js";
import fs from "fs";

const httpsOptions = {
  key: fs.readFileSync("../cert.pem"),
  cert: fs.readFileSync("../key.pem"),
};

const app = express();
const httpServer = createServer(httpsOptions, app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3001",
  },
});
dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use("/users", UserRouter);

app.use("/messages", checkToken, MessageRouter);

app.use(ErrorHandler);

io.on("connection", async (socket) => {
  if (!(await verifyToken(socket.handshake.query.token))) {
    console.log("Invalid token detected!!\ndisconnecting socket");
    socket.disconnect();
  } else {
    socket.on("sendMessage", async (messageId) => {
      const message = await MessageService.GetMessageById(messageId);
      if (messageId !== null) {
        io.sockets.emit("receiveMessage", message);
      }
    });
  }
});

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
