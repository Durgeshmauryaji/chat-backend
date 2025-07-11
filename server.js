import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
  origin: "https://chattingappp.netlify.app", 
  methods: ["GET", "POST"]
}

});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ID: ${socket.id} joined room: ${room}`);
  });

  socket.on("send_message", (data) => {
    console.log("Send message data:", data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use(cors());

server.listen(1000, () => {
  console.log("Server is running on port 1000.");
});
