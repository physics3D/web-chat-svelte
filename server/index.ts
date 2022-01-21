import socketio, { Socket } from 'socket.io';
import express from 'express';
import http from 'http';
import path from 'path';
import * as argon2 from 'argon2';
import { MongoClient } from 'mongodb';

async function main() {
  const app = express();
  app.use('/', express.static(path.join(`${__dirname}/../client/public`)));
  const server = new http.Server(app);
  const io = new socketio.Server(server);
  const port = process.env.PORT || 3000;
  const mongoClient = new MongoClient('mongodb://127.0.0.1:27017', { useUnifiedTopology: true });
  await mongoClient.connect();
  console.log('successfully connected');

  const db = mongoClient.db('web-chat-svelte');

  const messages = db.collection('messages');
  const users = db.collection('users');

  // index for better performance
  users.createIndex('nickname');

  const connected_users: string[] = [];
  const typing_users: string[] = [];

  function system_message(text: string) {
    const msg = {
      author: 'system',
      text,
      systemMessage: true,
    };
    messages.insertOne(msg);
    io.emit('chat message', msg);
  }

  async function verify_user(nickname: string, password: string): Promise<boolean> {
    const user = await users.findOne({ nickname });
    if (user === null) {
      return false;
    }
    const password_correct = await argon2.verify(user.hashed_password, password);
    return password_correct;
  }

  async function check_user_exists(nickname: string): Promise<boolean> {
    const user = await users.findOne({ nickname });
    return user !== null;
  }

  io.on('connection', (socket: Socket) => {
    socket.on('register', async (user_data, callback) => {
      const { nickname } = user_data;
      const { password } = user_data;
      const user_exists = await check_user_exists(nickname);
      if (user_exists) {
        callback(false);
      } else {
        callback(true);
        const hashed_password = await argon2.hash(password);
        users.insertOne({ nickname, hashed_password });
      }
    });

    socket.on('login', async (user_data, callback) => {
      const { nickname } = user_data;
      const { password } = user_data;
      const login_successful = await verify_user(nickname, password);
      if (!login_successful) {
        callback(false);
      } else {
        callback(true);
        connected_users.push(nickname);
        system_message(`${nickname} joined the chat`);

        const msgs = await messages.find({}).toArray();

        socket.emit('sync', msgs);
        socket.emit('typing sync', typing_users);

        socket.on('chat message', async (msg: string) => {
          // security so no user sends system messages
          // systemMessage is always false
          const public_msg = {
            author: nickname,
            text: msg,
            systemMessage: false,
          };

          const inserted = await messages.insertOne(public_msg);
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
          index = connected_users.indexOf(nickname);
          connected_users.splice(index, 1);
          io.emit('typing', typing_users);
        });

        socket.on('change password', async (password_data, password_callback) => {
          const { old_password } = password_data;
          const { new_password } = password_data;
          const hashed_password = await argon2.hash(new_password);
          if (await verify_user(nickname, old_password)) {
            await users.findOneAndUpdate({ nickname }, { $set: { hashed_password } });
            password_callback(true);
          } else {
            password_callback(false);
          }
        });
      }
    });
  });

  server.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
  });
}

main();
