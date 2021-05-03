/* eslint-disable camelcase */
/* eslint-disable no-console */
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketio(server);
const port = process.env.PORT || 3000;

const messages = [];

const typing_users = [];

function system_message(text) {
  const msg = {
    author: 'system',
    text,
    systemMessage: true,
  };
  messages.push(msg);
  io.emit('chat message', msg);
}

io.on('connection', (socket) => {
  socket.on('login', (nickname) => {
    system_message(`${nickname} joined the chat`);

    socket.emit('sync', messages);
    socket.emit('typing sync', typing_users);

    socket.on('chat message', (msg) => {
      // security so no user sends system messages
      // systemMessage is always false
      const public_msg = {
        author: nickname,
        text: msg,
        systemMessage: false,
      };

      messages.push(public_msg);
      console.log(public_msg);
      io.emit('chat message', public_msg);
    });

    socket.on('typing', () => {
      const index = typing_users.indexOf(nickname);
      // if not found
      if (index < 0) {
        typing_users.push(nickname);
        io.emit('typing', typing_users);
      }
    });

    socket.on('typing stop', () => {
      const index = typing_users.indexOf(nickname);
      typing_users.splice(index, 1);
      io.emit('typing', typing_users);
    });

    socket.on('disconnect', () => {
      system_message(`${nickname} left the chat`);

      // remove user from typing ones
      const index = typing_users.indexOf(nickname);
      typing_users.splice(index, 1);
      io.emit('typing', typing_users);
    });
  });
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
