<script lang="ts">
  import { io } from "socket.io-client";
  import Chat from "../pages/Chat.svelte";

  let socket = io("http://localhost:3000");

  let input: string;
  let messages = [];

  let submit = () => {
    if (input) {
      socket.emit("chat message", input);
      input = "";
    }
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
  <Chat />
</main>

<style>
  main {
    margin: 0;
    padding-bottom: 3rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
  }
</style>
