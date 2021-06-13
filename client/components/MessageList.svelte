<script lang="ts">
  import UserMessage from "../components/UserMessage.svelte";
  import SystemMessage from "../components/SystemMessage.svelte";

  type Message = {
    author: string;
    text: string;
    systemMessage: boolean;
  };

  export let messages: Message[];
</script>

<ul>
  {#each messages as message}
    {#if message.systemMessage}
      <SystemMessage {message} />
    {:else}
      <UserMessage {message} />
    {/if}
  {/each}
</ul>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: auto;
    /* cheat to fix scroll issue with msg bar */
    margin-bottom: var(--msg-form-height);
    /* cheat to fix overlapping issue with sidebar */
    margin-left: var(--sidebar-width);
  }
</style>
