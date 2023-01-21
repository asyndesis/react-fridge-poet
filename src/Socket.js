import io from "socket.io-client";
var server = "https://fridge-poet-server.onrender.com";
export const Socket = io.connect(server);
window.setInterval(() => {
  if (Socket.connected) window.dispatchEvent(new Event("socket_found"));
  if (!Socket.connected) window.dispatchEvent(new Event("socket_lost"));
}, 5000);
export default "";
