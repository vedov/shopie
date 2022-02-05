$("#submitOrder").click(function () {
  const data = { text: productnames, shops: shops };
  for (shop of shops) {
    console.log(shop);
  }
  socket.emit("customer-notification", data);
});

module.exports = (io, socket, onlineUsers) => {
  socket.on("new user", (username) => {
    //Save the username as key to access the user's socket id
    onlineUsers[username] = socket.id;
    //Save the username to socket as well. This is important for later.
    socket["username"] = username;
    console.log(`✋ ${username} has joined the chat! ✋`);
    io.emit("new user", username);
  });

  socket.on("new message", (data) => {
    console.log(`🎤 ${data.sender}: ${data.message} 🎤`);
    io.emit("new message", data);
  });
};