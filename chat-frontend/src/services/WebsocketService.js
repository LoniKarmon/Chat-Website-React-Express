import { io } from "socket.io-client";
import { SERVER_URL } from "../constants.js";

const URL = SERVER_URL || "http://localhost:3000";

const socket = io(URL, { query: { token: localStorage.getItem("token") } });

export { socket };
