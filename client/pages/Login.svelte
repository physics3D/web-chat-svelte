<script lang="ts">
  import { createEventDispatcher } from "svelte";

  let nickname: string;
  export let user_exists: boolean;

  let dispatcher = createEventDispatcher();
  let handleLogin = () => {
    dispatcher("login", nickname);
  };
</script>

<h1>Please enter your nickname</h1>
{#if user_exists}
  <p>This username already exists</p>
{/if}
<form on:submit|preventDefault={handleLogin}>
  <input type="text" bind:value={nickname} />
  <button>Join the chat</button>
</form>

<style>
</style>
