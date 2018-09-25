import io from "socket.io-client";
export const Socket = io.connect('http://localhost:8000');
export default '';