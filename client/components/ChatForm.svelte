<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import TypingUsers from "./TypingUsers.svelte";

  export let typing_users;
  export let nickname;

  let input;
  let dispatch = createEventDispatcher();

  let handleSubmit = () => {
    dispatch("submit", input);
    input = "";
  };

  let handleInput = () => {
    dispatch("input", input);
  };
</script>

<TypingUsers {typing_users} {nickname} />
<form id="form" on:submit|preventDefault={handleSubmit}>
  <input
    id="input"
    autocomplete="off"
    bind:value={input}
    on:input={handleInput}
  />
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
