const socket = io();

socket.on("customer-notification", (data) => {
  $.notify("You have received a new order for: " + data.text, {
    className: "success",
    position: "top center",
    autoHide: false,
    arrowShow: true,
  });
});
