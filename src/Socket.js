import io from "socket.io-client";
export const Socket = io.connect("https://fridge-poet-server.onrender.com");
const interval = window.setInterval(() => {
  if (Socket.connected) {
    window.dispatchEvent(new Event("socket_found"));
    window.clearInterval(interval);
  }
}, 1000);
export default Socket;
