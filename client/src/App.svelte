<script lang="ts">
  import { io } from "socket.io-client";
  import Chat from "../pages/Chat.svelte";
  import Login from "../pages/Login.svelte";

  let socket = io("http://localhost:3000");

  type Message = {
    author: string;
    text: string;
    systemMessage: boolean;
  };

  let nickname: string;
  let messages: Message[] = [];
  let typing_users: string[] = [];

  let logged_in = false;
  let user_exists = false;

  let handleLogin = (e: CustomEvent) => {
    nickname = e.detail;
    socket.emit("login", nickname);
  };

  let handleMessage = (e: CustomEvent) => {
    socket.emit("chat message", e.detail);
    socket.emit("typing stop");
  };

  let handleTyping = () => {
    let index = typing_users.indexOf(nickname);
    // if not found
    if (index < 0) {
      typing_users.push(nickname);
      socket.emit("typing");
    }
  };

  let handleTypingStop = () => {
    socket.emit("typing stop");
  };

  socket.on("sync", (msgs) => {
    messages = msgs;
  });

  socket.on("typing sync", (typing_usrs) => {
    typing_users = typing_usrs;
  });

  socket.on("chat message", (msg) => {
    messages.push(msg);
    // to update svelte
    messages = messages;
  });

  socket.on("typing", (typing) => {
    typing_users = typing;
  });

  socket.on("login successful", (success) => {
    if (success) {
      user_exists = false;
      logged_in = true;
    } else {
      user_exists = true;
    }
  });
</script>

<main>
  {#if !logged_in}
    <Login on:login={handleLogin} {user_exists} />
  {:else}
    <Chat
      {messages}
      {typing_users}
      {nickname}
      on:chat_message={handleMessage}
      on:typing={handleTyping}
      on:typing_stop={handleTypingStop}
    />
  {/if}
</main>

<style>
  main {
    margin: 0;
    padding-bottom: 3rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
  }
</style>
