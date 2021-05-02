<script lang="ts">
  import { io } from "socket.io-client";
  import MessageList from "../components/MessageList.svelte";

  let socket = io("http://localhost:3000");

  let input: string;
  let messages = [];
  export let nickname: string;

  let submit = () => {
    if (input) {
      let msg = { author: nickname, text: input };
      socket.emit("chat message", msg);
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

<MessageList {messages} />
<form id="form" on:submit|preventDefault={submit}>
  <input id="input" autocomplete="off" bind:value={input} />
  <button>Send</button>
</form>

<style>
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
</style>
