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
        {id: 'basic1', name:'Basic Room 1', users:[], magnets: magnets.spawnMagnets('basic')},
        {id: 'basic2', name:'Basic Room 2', users:[], magnets: magnets.spawnMagnets('basic')},
        {id: 'poet', name:'Poet Room 1', users:[], magnets: magnets.spawnMagnets('poet')},
        {id: 'poet2', name:'Poet Room 2', users:[], magnets: magnets.spawnMagnets('poet')},
        {id: 'dbag', name:'D-Bag Room', users:[], magnets: magnets.spawnMagnets('dbag')},
        {id: 'dong', name:'Dong Room', users:[], magnets: magnets.spawnMagnets('dong')},
    ];
    return rooms;
}

const getSocketRoom = socket => {
    let theRoom = undefined;
    let socketRooms = [];
    if (io.sockets.adapter.sids[socket.id]){
        socketRooms = Object.keys( io.sockets.adapter.sids[socket.id] );
    }
    socketRooms.forEach(function(r){
        if (r !== socket.id){
            theRoom = r;
        }
    });
    return theRoom;
}

const socketLeaveAllRooms = socket => {
    let socketRooms = [];
    if (io.sockets.adapter.sids[socket.id]){
        socketRooms = Object.keys( io.sockets.adapter.sids[socket.id] );
    }
    rooms.forEach(function(room){
        room.users = room.users.filter(function (user) {
            return user.id !== socket.id;
        });
    });

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
        if (room == undefined){
            return false;
        }
        socketLeaveAllRooms(socket);
        socket.join(data.room_id);
        room.users.push({id:socket.id,name:data.userName,color:data.userColor});
        socket.emit('POPULATE_MAGNETS', room.magnets);
        io.to(room.id).emit('USER_JOINED', room.users);
    });


    socket.on('SEND_MESSAGE',function(data){
        let room_id = getSocketRoom(socket);
        let room = rooms.find(r => r.id === room_id);
        let user = room.users.find(u => u.id === socket.id);
        if (room == undefined){
            return false;
        }
        if (user == undefined){
            return false;
        }
        io.to(room.id).emit('RECIEVE_MESSAGE', {user:user,message:data.message});
    });

    socket.on('JOIN_LOBBY',function(data){
        socketLeaveAllRooms(socket);
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
        socketLeaveAllRooms(socket);
    });

});