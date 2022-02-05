const io = require("socket.io")();
const socketio = {
  io: io,
};
let onlineUsers = {};
io.on("connection", (socket) => {
  /* socket.on("new user", (username) => {
    //Save the username as key to access the user's socket id
    onlineUsers[username] = socket.id;
    //Save the username to socket as well. This is important for later.
    socket["username"] = username;
    console.log(`✋ ${username} has joined the chat! ✋`);
    io.emit("new user", username);
  });

  socket.on("customer-notification", (data) => {
    socket.broadcast.emit("customer-notification", data);
  }); */
  require("./public/js/customer")(io, socket, onlineUsers);
  require("./public/js/shop")(io, socket, onlineUsers);
});

module.exports = socketio;
