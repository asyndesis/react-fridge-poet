import io from "socket.io-client";
if (process.env.NODE_ENV === 'production') { 
    var server = 'https://fridge-poet.herokuapp.com/';
}else{
    var server = 'http://localhost:8000';
}
export const Socket = io.connect(server);
export default '';