const port = process.env.PORT || 3000;
const path = require("path");
const express = require("express");
const app = express();
const server = app.listen(port);
const socket = require("socket.io");
const magnets = require("./magnets");
io = socket(server);

app.use(express.static(path.join(__dirname, "../../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build/index.html"));
});

app.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

console.log("index.js running");

const roomTypes = magnets.getRoomTypes();

const spawnRooms = () => {
  let rooms = [
    { id: "lobby", name: "The Lobby", users: [], maxUsers: 9999999 },
    {
      id: "basic",
      name: "Basic Room",
      users: [],
      maxUsers: 10,
      magnets: magnets.spawnMagnets(["basic"]),
    },
    {
      id: "haiku",
      name: "Haiku Room",
      users: [],
      maxUsers: 10,
      magnets: magnets.spawnMagnets(["haiku"]),
    },
  ];
  return rooms;
};

const getSocketRoom = (socket) => {
  let theRoom = undefined;
  let socketRooms = [];
  if (io.sockets.adapter.sids[socket.id]) {
    socketRooms = Object.keys(io.sockets.adapter.sids[socket.id]);
  }
  socketRooms.forEach(function (r) {
    if (r !== socket.id) {
      theRoom = r;
    }
  });
  return theRoom;
};

const socketLeaveAllRooms = (socket, except_id) => {
  let socketRooms = [];
  if (io.sockets.adapter.sids[socket.id]) {
    socketRooms = Object.keys(io.sockets.adapter.sids[socket.id]);
  }

  rooms.forEach(function (room) {
    if (room.id === except_id) {
      return false;
    }
    let user = room.users.find((u) => u.id === socket.id);
    if (user !== undefined) {
      socket.broadcast
        .to(room.id)
        .emit("USER_LEFT", { user: user, room: { name: room.name } });
    }
    room.users = room.users.filter(function (user) {
      return user.id !== socket.id;
    });
  });

  socketRooms.forEach(function (r) {
    if (r !== socket.id && r !== except_id) {
      socket.leave(r);
    }
  });
};

function highestMagnet(m) {
  return m.reduce(function (previous, entry) {
    return previous === undefined || entry.z > previous ? entry.z : previous;
  }, undefined);
}

var rooms = spawnRooms();

io.on("connection", (socket) => {
  socket.on("JOIN_ROOM", function (data) {
    let name = data.userName || "anonymous";
    let color = data.userColor || "#888888";
    let room = rooms.find((r) => r.id === data.room_id);
    let user = { id: socket.id, name: name, color: color };
    if (room == undefined) {
      return false;
    }
    if (room.users.length >= room.maxUsers) {
      socket.emit("SHOW_STATUS_MESSAGE", {
        type: "warning",
        message: "The room is full.",
      });
      return false;
    }
    socketLeaveAllRooms(socket, room.id);
    socket.join(room.id);
    room.users.push(user);
    socket.emit("POPULATE_MAGNETS", room.magnets);
    socket.broadcast
      .to(room.id)
      .emit("USER_JOINED", { user: user, room: { name: room.name } });
  });

  socket.on("JOIN_LOBBY", function (data) {
    let name = data.userName || "anonymous";
    let color = data.userColor || "#888888";
    let room = rooms.find((r) => r.id === "lobby");
    let user = { id: socket.id, name: name, color: color };
    socketLeaveAllRooms(socket, "lobby");
    socket.join(room.id);
    room.users.push(user);
    socket.emit("RECEIVE_ROOMS", rooms);
    socket.broadcast
      .to(room.id)
      .emit("USER_JOINED", { user: user, room: { name: "Lobby" } });
  });

  socket.on("SEND_MESSAGE", function (data) {
    let room_id = getSocketRoom(socket);
    let room = rooms.find((r) => r.id === room_id);
    if (room == undefined) {
      socket.emit("SHOW_STATUS_MESSAGE", {
        type: "warning",
        message: "You are not currently in any room.",
      });
      return false;
    }
    let user = room.users.find((u) => u.id === socket.id);
    if (user == undefined) {
      socket.emit("SHOW_STATUS_MESSAGE", {
        type: "warning",
        message: "You are not currently in any room.",
      });
      return false;
    }
    io.to(room.id).emit("RECIEVE_MESSAGE", {
      user: user,
      message: data.message,
    });
  });

  socket.on("GET_ROOM_OPTIONS", function (data) {
    socket.emit("RECEIVE_ROOM_OPTIONS", { roomTypes: roomTypes });
  });

  socket.on("CREATE_ROOM", function (data) {
    let room = rooms.find((r) => r.id === data.roomUrl);
    let rt = [];
    if (
      data.roomUrl === "-" ||
      data.roomUrl === "" ||
      data.roomUrl === " " ||
      data.roomUrl === "lobby"
    ) {
      socket.emit("SHOW_STATUS_MESSAGE", {
        type: "warning",
        message: "Please enter a valid room name.",
      });
      return false;
    }
    if (!data.maxUsers) {
      socket.emit("SHOW_STATUS_MESSAGE", {
        type: "warning",
        message: "Please set max users for this room.",
      });
      return false;
    } else {
      data.maxUsers = parseInt(data.maxUsers, 10);
    }
    if (!Number.isInteger(data.maxUsers)) {
      socket.emit("SHOW_STATUS_MESSAGE", {
        type: "warning",
        message: "Please set max users as an integer.",
      });
      return false;
    }
    if (data.maxUsers < 1 || data.maxUsers > 10) {
      socket.emit("SHOW_STATUS_MESSAGE", {
        type: "warning",
        message: "Please set max users from 1 to 10.",
      });
      return false;
    }
    if (!data.checkedTypes) {
      socket.emit("SHOW_STATUS_MESSAGE", {
        type: "warning",
        message: "Please select some magnet types.",
      });
      return false;
    }
    if (Object.keys(data.checkedTypes).length === 0) {
      socket.emit("SHOW_STATUS_MESSAGE", {
        type: "warning",
        message: "Please select some magnet types.",
      });
      return false;
    }
    if (room !== undefined) {
      socket.emit("SHOW_STATUS_MESSAGE", {
        type: "warning",
        message: "That room name already exists.",
      });
      return false;
    }
    Object.keys(data.checkedTypes).forEach(function (key) {
      if (data.checkedTypes[key]) {
        rt.push(key);
      }
    });
    if (rt.length === 0) {
      socket.emit("SHOW_STATUS_MESSAGE", {
        type: "warning",
        message: "Please select some magnet types.",
      });
      return false;
    }
    rooms.unshift({
      id: data.roomUrl,
      maxUsers: data.maxUsers,
      name: data.roomName,
      users: [],
      magnets: magnets.spawnMagnets(rt),
    });
    socket.emit("ROOM_CREATED", { room: data.roomUrl });
  });

  socket.on("MOVE_MAGNET", function (data) {
    let room_id = getSocketRoom(socket);
    let room = rooms.find((r) => r.id === room_id);

    if (room == undefined) {
      return false;
    }
    if (data.magnet_id == undefined) {
      return false;
    }
    let magnet = room.magnets.find((r) => r.id === data.magnet_id);
    magnet.z = highestMagnet(room.magnets) + 1;
    magnet.x = data.x;
    magnet.y = data.y;

    io.to(room.id).emit("POPULATE_MAGNETS", room.magnets);
  });
  socket.on("disconnect", function () {
    socketLeaveAllRooms(socket);
  });
});
