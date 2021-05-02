/* eslint-disable no-console */
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketio(server);
const port = process.env.PORT || 3000;

const messages = [];

function system_message(text) {
  let msg = {
    author: 'system',
    text: text,
    systemMessage: true
  }
  messages.push(msg);
  io.emit('chat message', msg);
}

io.on('connection', (socket) => {
  socket.on('login', (nickname) => {
    system_message(nickname + ' joined the chat');

    socket.emit('sync', messages);

    socket.on('chat message', (msg) => {
      let public_msg = {
        author: msg.author,
        text: msg.text,
        systemMessage: false
      }

      messages.push(public_msg);
      console.log(public_msg);
      io.emit('chat message', public_msg);
    });

    socket.on('disconnect', () => {
      system_message(nickname + ' left the chat');
    });
  });
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
