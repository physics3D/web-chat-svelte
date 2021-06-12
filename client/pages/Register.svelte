<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let user_exists: boolean;
  let empty_username: boolean;

  let nickname: string;
  let password: string;

  let dispatcher = createEventDispatcher();
  let handleRegister = () => {
    if (nickname) {
      empty_username = false;
      dispatcher("register", { nickname, password });
    } else {
      empty_username = true;
    }
  };
</script>

<h1>Register</h1>
<form on:submit|preventDefault={handleRegister}>
  {#if user_exists}
    <p>This username already exists</p>
  {/if}
  {#if empty_username}
    <p>The username must not be empty</p>
  {/if}
  <p>Please enter your nickname</p>
  <input type="text" bind:value={nickname} placeholder="Your nickname" />
  <p>Please enter your password</p>
  <input type="password" bind:value={password} placeholder="Your password" />
  <button>Create account</button>
</form>

<style>
  h1 {
    color: var(--author-color);
    text-align: center;
  }

  p {
    color: var(--author-color);
    text-align: center;
    font-size: large;
  }

  form {
    border: none;
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.25rem;
    margin-left: 3rem;
    margin-right: 3rem;
    padding: 1rem;
    border-radius: 1rem;
  }

  button {
    border-radius: 999px;
    font-size: large;
    box-shadow: 0 0 20px black;
    border: none;
    background: var(--dark-bg-color);
    color: var(--text-color);
    display: block;
    padding: 1rem;
    margin: 0.25rem;
  }

  input {
    border: none;
    border-radius: 2rem;
    display: block;
    font-size: large;
    padding: 0.5rem;
    margin: 1rem;
  }
</style>
