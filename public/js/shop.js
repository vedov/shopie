const socket = io();

socket.on("customer-notification", (data) => {
  $.notify("Received order from ${data.text}", {
    className: "info",
    position: "bottom center",
    autoHide: false,
    arrowShow: true,
  });
});
