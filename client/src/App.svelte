<script lang="ts">
  import { io } from "socket.io-client";
  import Chat from "../pages/Chat.svelte";
  import Login from "../pages/Login.svelte";

  let socket = io("http://localhost:3000");

  let input: string;
  let nickname;
  let messages = [];

  let logged_in = false;

  let submit = () => {
    if (input) {
      socket.emit("chat message", input);
      input = "";
    }
  };

  let handleLogin = (e) => {
    logged_in = true;
    nickname = e.detail;
  };

  socket.on("sync", (msgs) => {
    messages = msgs;
  });

  socket.on("chat message", (msg) => {
    messages.push(msg);
    // to update svelte
    messages = messages;
  });
</script>

<main>
  {#if !logged_in}
    <Login on:login={handleLogin} />
  {:else}
    <Chat {nickname} />
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
