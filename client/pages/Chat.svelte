<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import ChatForm from "../components/ChatForm.svelte";
  import MessageList from "../components/MessageList.svelte";

  type Message = {
    author: string;
    text: string;
    systemMessage: boolean;
  };

  export let messages: Message[];
  export let typing_users: string[];
  export let nickname: string;
  export let logged_in: boolean;

  let dispatch = createEventDispatcher();

  let handleSubmit = (e: CustomEvent) => {
    if (e.detail) {
      dispatch("chat_message", e.detail);
    }
  };

  let handleInput = (e: CustomEvent) => {
    if (e.detail) {
      dispatch("typing");
    } else {
      dispatch("typing_stop");
    }
  };
</script>

{#if logged_in}
  <MessageList {messages} />
  <ChatForm
    {typing_users}
    {nickname}
    on:input={handleInput}
    on:submit={handleSubmit}
  />
{:else}
  <h1>Please log in to see the chat</h1>
{/if}

<style>
  h1 {
    color: var(--author-color);
    text-align: center;
  }
</style>
