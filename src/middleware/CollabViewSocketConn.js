import io from "socket.io-client";
const CollabViewSocket = io("http://192.168.29.229:3001");

export default CollabViewSocket;