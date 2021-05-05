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

<MessageList {messages} />
<ChatForm
  {typing_users}
  {nickname}
  on:input={handleInput}
  on:submit={handleSubmit}
/>
