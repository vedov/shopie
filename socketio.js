const io = require("socket.io")();
const socketio = {
  io: io,
};

const users = {};

io.on("connection", (socket) => {
  socket.on("customer-notification", (data) => {
    socket.broadcast.emit("customer-notification", data);
  });
});

module.exports = socketio;
