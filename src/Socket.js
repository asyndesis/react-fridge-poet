import io from "socket.io-client";
export const Socket = io.connect(process.env.REACT_APP_SOCKET_URL);

let hasErrorOccurred = false;

const handleSocketError = () => {
  if (!hasErrorOccurred) {
    hasErrorOccurred = true;
    console.error("Socket error occurred");
    setTimeout(() => {
      hasErrorOccurred = false;
      Socket.connect(); // Attempt to reconnect after a delay
    }, 5000);
  }
};

const handleSocketSuccess = () => {
  if (!hasErrorOccurred) {
    window.dispatchEvent(new Event("socket_found"));
  }
};

Socket.on("connect", handleSocketSuccess);
Socket.on("connect_error", handleSocketError);
Socket.on("connect_timeout", handleSocketError);
Socket.on("error", handleSocketError);
Socket.on("reconnect_error", handleSocketError);
Socket.on("reconnect_failed", handleSocketError);

const interval = window.setInterval(() => {
  console.log(process.env.REACT_APP_SOCKET_URL);
  if (Socket.connected && !hasErrorOccurred) {
    window.clearInterval(interval);
  }
}, 1000);

export default Socket;
