const io = require("socket.io")();
const socketio = {
  io: io,
};
let users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-chat-message", (message) => {
    io.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });
  socket.on("disconnect", () => {
    io.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });

  socket.on("customer-notification", (data) => {
    socket.broadcast.emit("customer-notification", data);
  });
});

module.exports = socketio;
