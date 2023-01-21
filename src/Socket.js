import io from "socket.io-client";
var server = "https://fridge-poet-server.onrender.com";
export const Socket = io.connect(server);
export default "";
