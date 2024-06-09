import io from "socket.io-client";
export const Socket = io.connect(process.env.REACT_APP_SOCKET_URL);
const interval = window.setInterval(() => {
  console.log(process.env.REACT_APP_SOCKET_URL);
  if (Socket.connected) {
    window.dispatchEvent(new Event("socket_found"));
    window.clearInterval(interval);
  }
}, 1000);
export default Socket;
