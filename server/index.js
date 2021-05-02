/* eslint-disable no-console */
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketio(server);
const port = process.env.PORT || 3000;

const messages = [];

io.on('connection', (socket) => {
  socket.emit('sync', messages);

  socket.on('chat message', (msg) => {
    console.log(msg);
    messages.push(msg);
    io.emit('chat message', msg);
  });
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
