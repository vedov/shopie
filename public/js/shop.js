const socket = io();

/* $("#login").click(function () {
  const data = { user: user };

  socket.emit("users", data);
}); */
/* 
socket.on("users", (data) => {
  console.log("user", data);
}); */

socket.on("customer-notification", (data) => {
  $.notify("You have received a new order for: " + data.text, {
    className: "success",
    position: "top center",
    autoHide: false,
    arrowShow: true,
  });
});
