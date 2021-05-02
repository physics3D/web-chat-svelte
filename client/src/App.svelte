<script lang="ts">
  import { io } from "socket.io-client";

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
  <ul id="messages">
    {#each messages as message}
      <li>{message}</li>
    {/each}
  </ul>

  <form id="form" on:submit|preventDefault={submit}>
    <input id="input" autocomplete="off" bind:value={input} />
    <button>Send</button>
  </form>
</main>

<style>
  main {
    margin: 0;
    padding-bottom: 3rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif;
  }

  #form {
    background: rgba(0, 0, 0, 0.15);
    padding: 0.25rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 3rem;
    box-sizing: border-box;
    backdrop-filter: blur(10px);
  }
  #input {
    border: none;
    padding: 0 1rem;
    flex-grow: 1;
    border-radius: 2rem;
    margin: 0.25rem;
  }
  #input:focus {
    outline: none;
  }
  #form > button {
    background: #333;
    border: none;
    padding: 0 1rem;
    margin: 0.25rem;
    border-radius: 3px;
    outline: none;
    color: #fff;
  }

  #messages {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  #messages > li {
    padding: 0.5rem 1rem;
  }
  #messages > li:nth-child(odd) {
    background: #efefef;
  }
</style>
