<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import TypingUsers from "./TypingUsers.svelte";

  export let typing_users: string[];
  export let nickname: string;

  let input: string;
  let dispatch = createEventDispatcher();

  let handleSubmit = () => {
    dispatch("submit", input);
    input = "";
  };

  let handleInput = () => {
    dispatch("input", input);
  };
</script>

<div>
  <TypingUsers {typing_users} {nickname} />
  <form on:submit|preventDefault={handleSubmit}>
    <input autocomplete="off" bind:value={input} on:input={handleInput} />
    <button><img src="assets/send.svg" alt="" /></button>
  </form>
</div>

<style>
  div {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    background-color: var(--bg-color);
  }

  form {
    padding: 0.25rem;
    display: flex;
    box-sizing: border-box;
    height: var(--msg-form-height);
  }

  input {
    border: none;
    padding: 0 1rem;
    flex-grow: 1;
    border-radius: 2rem;
    margin: 0.25rem;
    background-color: var(--input-color);
    color: #ffffff;
  }

  button {
    background: var(--dark-bg-color);
    border: none;
    padding: 0 1rem;
    border-radius: 1rem;
    outline: none;
    color: #fff;
    box-shadow: none;
  }
</style>
