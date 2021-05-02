<script lang="ts">
  import { createEventDispatcher } from "svelte";

  let nickname;

  let dispatcher = createEventDispatcher();
  let handleLogin = () => {
    dispatcher("login", nickname);
  };
</script>

<h1>Please enter your nickname</h1>
<form on:submit|preventDefault={handleLogin}>
  <input type="text" bind:value={nickname} />
  <button>Join the chat</button>
</form>

<style>
</style>
