import { io } from "socket.io-client";

const URL = process.env.REACT_APP_SERVER_URL || "https://localhost:3000";

const socket = io(URL, { query: { token: localStorage.getItem("token") } });

export { socket };
