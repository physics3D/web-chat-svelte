import socketio, { Socket } from 'socket.io';
import express from 'express';
import http from 'http';
import path from 'path';
import monk from 'monk';

const app = express();
app.use('/', express.static(path.join(`${__dirname}/../client/public`)));
const server = new http.Server(app);
const io = new socketio.Server(server);
const port = process.env.PORT || 3000;
const db = monk('mongodb://localhost:27017/web-chat-svelte');

const messages = db.get('messages');

const users: string[] = [];
const typing_users: string[] = [];

function system_message(text: string) {
  const msg = {
    author: 'system',
    text,
    systemMessage: true,
  };
  messages.insert(msg);
  io.emit('chat message', msg);
}

io.on('connection', (socket: Socket) => {
  socket.on('login', async (nickname: string) => {
    const user_exists = users.indexOf(nickname) >= 0;
    if (user_exists) {
      socket.emit('login successful', false);
    } else {
      socket.emit('login successful', true);
      users.push(nickname);
      system_message(`${nickname} joined the chat`);

      const msgs = await messages.find({});

      socket.emit('sync', msgs);
      socket.emit('typing sync', typing_users);

      socket.on('chat message', (msg: string) => {
        // security so no user sends system messages
        // systemMessage is always false
        const public_msg = {
          author: nickname,
          text: msg,
          systemMessage: false,
        };

        const inserted = messages.insert(public_msg);
        console.log(inserted);
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

      socket.on('disconnect', async () => {
        system_message(`${nickname} left the chat`);

        // remove user from typing ones
        let index = typing_users.indexOf(nickname);
        typing_users.splice(index, 1);
        index = users.indexOf(nickname);
        users.splice(index, 1);
        io.emit('typing', typing_users);
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
