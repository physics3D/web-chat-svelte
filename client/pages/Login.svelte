<script lang="ts">
  import { createEventDispatcher } from "svelte";

  let nickname: string;
  export let user_exists: boolean;
  let empty_username: boolean;

  let dispatcher = createEventDispatcher();
  let handleLogin = () => {
    if (nickname) {
      empty_username = false;
      dispatcher("login", nickname);
    } else {
      empty_username = true;
    }
  };
</script>

<h1>Please enter your nickname</h1>
{#if user_exists}
  <p>This username already exists</p>
{/if}
{#if empty_username}
  <p>The username must not be empty</p>
{/if}
<form on:submit|preventDefault={handleLogin}>
  <input type="text" bind:value={nickname} />
  <button>Join the chat</button>
</form>

<style>
</style>
