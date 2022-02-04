$("#submitOrder").click(function () {
  const data = {text:"Morel"};
  socket.emit("customer-notification", data);
});
