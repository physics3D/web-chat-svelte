<script lang="ts">
  import { createEventDispatcher } from "svelte";

  let dispatcher = createEventDispatcher();

  enum Page {
    Home,
    Register,
    Login,
    Chat,
  }

  let switchToRegister = () => {
    dispatcher("switchPage", Page.Register);
  };

  let switchToLogin = () => {
    dispatcher("switchPage", Page.Login);
  };
</script>

<h1>Welcome to Web Chat</h1>
<p>Welcome to Web Chat - your chat in the browser.</p>
<p>
  Depending on whether you already have an account or not, click on of the
  buttons below to get started.
</p>
<div>
  <button on:click={switchToRegister}>Register</button>
  <button on:click={switchToLogin}>Login</button>
</div>

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

  div {
    border: none;
    box-sizing: content-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
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
    margin: 1rem;
  }
</style>
