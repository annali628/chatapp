const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");

const app = express();

app.use(cors());

const server = app.listen(3000);

const io = socketio(server, {
  cors: {
    // should use environment variables but for now we will hard code it
    origin: "https://chatappbyanna.onrender.com",
  },
});

const messages = [];

io.on("connection", (socket) => {
  socket.emit("allMessages", messages);
  socket.on("sendMessage", (data) => {
    messages.push(data);

    io.emit("allMessages", messages);
  });
});
