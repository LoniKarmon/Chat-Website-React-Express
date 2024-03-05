import express from "express";
import UserRouter from "./routes/UserRouter.js";
import MessageRouter from "./routes/MessageRouter.js";
import cors from "cors";
import ErrorHandler from "./middleware/ErrorMiddleware.js";
import dotenv from "dotenv";
import db from "./utils/db.js";
import { checkToken, verifyToken } from "./middleware/AuthMiddleware.js";
import { createServer } from "https";
import { Server } from "socket.io";
import MessageService from "./services/MessageService.js";
import fs from "fs";

const httpsOptions = {
  cert: fs.readFileSync("./cert.pem"),
  key: fs.readFileSync("./key.pem"),
};

const app = express();
const httpsServer = createServer(httpsOptions, app);
const io = new Server(httpsServer, {
  cors: {
    origin: process.env.CLIENT_URL || "https://localhost:3001",
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
  }

  socket.on("sendMessage", async (messageId) => {
    if (await verifyToken(socket.handshake.query.token)) {
      if (messageId !== null) {
        io.sockets.emit("receiveMessage", messageId);
      }
    } else {
      console.log("Invalid token detected!!\ndisconnecting socket");
      socket.disconnect();
    }
  });
});

httpsServer.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
