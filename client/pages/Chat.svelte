<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import ChatForm from "../components/ChatForm.svelte";
  import MessageList from "../components/MessageList.svelte";

  export let messages;
  export let typing_users;
  export let nickname;

  let dispatch = createEventDispatcher();

  let handleSubmit = (e) => {
    if (e.detail) {
      dispatch("chat_message", e.detail);
    }
  };

  let handleInput = (e) => {
    if (e.detail) {
      dispatch("typing");
    } else {
      dispatch("typing_stop");
    }
  };
</script>

<MessageList {messages} />
<ChatForm
  {typing_users}
  {nickname}
  on:input={handleInput}
  on:submit={handleSubmit}
/>
