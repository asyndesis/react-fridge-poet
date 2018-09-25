import io from "socket.io-client";

var server = 'http://localhost:8000';
if (process.env.NODE_ENV === 'production') { 
    server = 'https://fridge-poet.herokuapp.com/';
}
export const Socket = io.connect(server);
export default '';