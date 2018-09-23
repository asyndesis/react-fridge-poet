var express = require('express');
var app = express();
server = app.listen(8000, function(){
    console.log('server is running on port 8000')
});
var socket = require('socket.io');
io = socket(server);


const spawnMagnets = () => {
    let magnets = [
        {id:0, word: 'ing', x:10, y:20},
        {id:1, word: 'fart', x:30, y:50},
        {id:2, word: 'I', x:100,y:150},
        {id:3, word: 'am', x:100,y:150},
    ];
    return magnets;
}

const spawnRooms = () => {
    let rooms = [
        {id: 'room1', name:'Room 1', users:0, magnets: spawnMagnets()},
        {id: 'room2', name:'Room 2', users:0, magnets: spawnMagnets()},
        {id: 'room3', name:'Room 3', users:0, magnets: spawnMagnets()},
    ];
    return rooms;
}

const getSocketRoom = socket => {
    let theRoom = undefined;
    let socketRooms = Object.keys( io.sockets.adapter.sids[socket.id] );
    socketRooms.forEach(function(r){
        if (r !== socket.id){
            theRoom = r;
        }
    });
    return theRoom;
}
const updateRoomUsers = () => {
    rooms.forEach(function(r){
        let room = io.sockets.adapter.rooms[r.id];
        if (!room){
            r.users = 0;
        }else{
            r.users = io.sockets.adapter.rooms[r.id].length;
        }
    });
}
const socketLeaveAllRooms = socket => {
    let socketRooms = Object.keys( io.sockets.adapter.sids[socket.id] );
    socketRooms.forEach(function(r){
        if (r !== socket.id){
            let room = rooms.find(rr => rr.id === r);
            socket.leave(r);
        }
    });
}

var rooms = spawnRooms();

io.on('connection', (socket) => {

    socket.on('JOIN_ROOM', function(data){
        let room = rooms.find(r => r.id === data.room_id);
        room.users++;
        socketLeaveAllRooms(socket);
        updateRoomUsers();
        socket.join(data.room_id);
        socket.emit('POPULATE_MAGNETS', room.magnets);
    });

    socket.on('JOIN_LOBBY',function(data){
        socketLeaveAllRooms(socket);
        updateRoomUsers();
        socket.emit('RECEIVE_ROOMS', rooms);
    });

    socket.on('MOVE_MAGNET', function(data){
        let room_id = getSocketRoom(socket);
        let room = rooms.find(r => r.id === room_id);

        if (room == undefined){
            return false;
        }
        if (data.magnet_id == undefined){
            return false;
        }

        room.magnets.find(r => r.id === data.magnet_id).x = data.x;
        room.magnets.find(r => r.id === data.magnet_id).y = data.y;

        io.to(room.id).emit('POPULATE_MAGNETS', room.magnets);
  
    });
    socket.on('disconnect', function () {
        updateRoomUsers();
    });

});