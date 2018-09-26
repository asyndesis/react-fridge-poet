const port = process.env.PORT || 8000;
const path = require('path');
const express = require('express');
const app = express();
const server = app.listen(port);
const socket = require('socket.io');
const magnets = require('./magnets');
io = socket(server);

app.use(express.static(path.join(__dirname,'../../build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build/index.html'));
});

console.log('index.js running');

const spawnRooms = () => {
    let rooms = [
        {id: 'basic1', name:'Basic Room 1', users:0, magnets: magnets.spawnMagnets('basic')},
        {id: 'basic2', name:'Basic Room 2', users:0, magnets: magnets.spawnMagnets('basic')},
        {id: 'poet', name:'Poet Room 1', users:0, magnets: magnets.spawnMagnets('poet')},
        {id: 'poet2', name:'Poet Room 2', users:0, magnets: magnets.spawnMagnets('poet')},
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
        let magnet = room.magnets.find(r => r.id === data.magnet_id);
        magnet.x = data.x;
        magnet.y = data.y;

        io.to(room.id).emit('POPULATE_MAGNETS', room.magnets);
  
    });
    socket.on('disconnect', function () {
        updateRoomUsers();
    });

});