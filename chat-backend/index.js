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
import { httpsOptions } from "./https.config.js";

const app = express();
const httpsServer = createServer(httpsOptions, app);

dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use("/users", UserRouter);

app.use("/messages", checkToken, MessageRouter);

app.use(ErrorHandler);

httpsServer.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

const io = new Server(httpsServer, {
  cors: {
    origin: process.env.CLIENT_URL || "https://localhost:3001",
  },
});

io.on("connection", async (socket) => {
  socket.data.user = await verifyToken(socket.handshake.query.token);
  if (!socket.data.user) {
    console.log("Invalid token detected!!\ndisconnecting socket");
    socket.disconnect();
  }
});

export { io };
