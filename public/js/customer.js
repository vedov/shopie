$("#submitOrder").click(function () {
  const data = { text: productnames };
  socket.emit("customer-notification", data);
});
