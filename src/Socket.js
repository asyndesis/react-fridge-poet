import io from "socket.io-client";
export const Socket = io.connect(process.env.REACT_APP_SOCKET_URL);

const interval = window.setInterval(() => {
  Socket.connect(); // Attempt to reconnect after a delay
  if (Socket.connected) {
    window.clearInterval(interval);
  }
}, 15000);

export default Socket;
