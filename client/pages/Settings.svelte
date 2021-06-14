<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let nickname: string;
  export let logged_in: boolean;
  export let change_password_success: boolean;

  let dispatcher = createEventDispatcher();

  let old_password: string;
  let new_password: string;
  let new_password2: string;
  let one_password_empty = false;
  let passwords_do_not_match = false;
  let user_tried_changing_passwords = false;

  let handleChangePassword = () => {
    if (old_password && new_password && new_password2) {
      one_password_empty = false;
      if (new_password === new_password2) {
        passwords_do_not_match = false;
        user_tried_changing_passwords = true;
        dispatcher("changePassword", { old_password, new_password });
      } else {
        passwords_do_not_match = true;
        user_tried_changing_passwords = false;
      }
    } else {
      one_password_empty = true;
      user_tried_changing_passwords = false;
    }
  };
</script>

{#if logged_in}
  <h1>Settings</h1>
  <h2>Account Info</h2>
  <p>Nickname: {nickname}</p>
  <h2>Change your password</h2>
  {#if one_password_empty}
    <p>None of the fields can be empty</p>
  {/if}
  {#if passwords_do_not_match}
    <p>The new passwords do not match</p>
  {/if}
  {#if !change_password_success}
    <p>The old password is wrong</p>
  {/if}
  <form on:submit|preventDefault={handleChangePassword}>
    <p>Please enter your current password</p>
    <input
      type="password"
      bind:value={old_password}
      placeholder="Your current password"
    />
    <p>Please enter your new password</p>
    <input
      type="password"
      bind:value={new_password}
      placeholder="Your new password"
    />
    <p>Please repeat your new password</p>
    <input
      type="password"
      bind:value={new_password2}
      placeholder="Your new password"
    />
    <button>Change your password</button>
    {#if change_password_success && user_tried_changing_passwords}
      <p>Your password was successfully changed!</p>
    {/if}
  </form>
{:else}
  <h1>Please log in to change your settings</h1>
{/if}

<style>
  h1 {
    color: var(--author-color);
    text-align: center;
  }

  h2 {
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
