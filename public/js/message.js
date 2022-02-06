const socket = io();
const chatMessages = $(".chat-messages");
const chatForm = $("#chat-form");
const messageInput = $("#message");
const botName = "Server";

socket.emit("new-user", user);

socket.on("chat-message", (data) => {
  appendMessage(
    `<p class="meta">${data.name}</p><p class="text">${data.message}</p>`
  );
  chatMessages.scrollTop(chatMessages[0].scrollHeight);
});

socket.on("user-connected", (name) => {
  appendMessage(
    `<p class="meta">${botName}:</p><p class="text">${name} connected</p>`
  );
});

socket.on("user-disconnected", (name) => {
  appendMessage(
    `<p class="meta">${botName}:</p><p class="text">${name} disconnected</p>`
  );
});

chatForm.on("submit", (e) => {
  e.preventDefault();
  const message = messageInput.val();
  socket.emit("send-chat-message", message);
  messageInput.val("");
  messageInput.focus();
});

const appendMessage = (message) => {
  const messageElement = $("<div></div>")
    .addClass("message text-dark")
    .html(message)
    .appendTo(chatMessages);
};
