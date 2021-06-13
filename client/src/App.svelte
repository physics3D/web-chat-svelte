<script lang="ts">
  import { io } from "socket.io-client";
  import Sidebar from "../components/Sidebar.svelte";
  import Chat from "../pages/Chat.svelte";
  import Home from "../pages/Home.svelte";
  import Login from "../pages/Login.svelte";
  import Register from "../pages/Register.svelte";

  let socket = io();

  type Message = {
    author: string;
    text: string;
    systemMessage: boolean;
  };

  enum Page {
    Home,
    Register,
    Login,
    Chat,
  }

  let nickname: string;
  let messages: Message[] = [];
  let typing_users: string[] = [];

  let page = Page.Home;
  let user_exists = false;
  let login_successful = true;

  let handleLogin = (e: CustomEvent) => {
    nickname = e.detail.nickname;
    socket.emit("login", e.detail, (success: boolean) => {
      login_successful = success;
      if (success) {
        page = Page.Chat;
      }
    });
  };

  let handleRegister = (e: CustomEvent) => {
    socket.emit("register", e.detail, (success: boolean) => {
      user_exists = !success;
      if (success) {
        page = Page.Login;
      }
    });
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

  let handleSwitchPage = (e: CustomEvent) => {
    page = e.detail;
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
</script>

<div>
  <Sidebar on:switchPage={handleSwitchPage} />
  <main>
    {#if page == Page.Home}
      <Home on:switchPage={handleSwitchPage} />
    {:else if page == Page.Register}
      <Register on:register={handleRegister} {user_exists} />
    {:else if page == Page.Login}
      <Login on:login={handleLogin} {login_successful} />
    {:else if page == Page.Chat}
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
</div>

<style>
  div {
    display: flex;
  }
  main {
    background-color: var(--bg-color);
    width: 100%;
  }
</style>
