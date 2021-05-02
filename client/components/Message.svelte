<script lang="ts">
  import SystemMessage from "./SystemMessage.svelte";
  import UserMessage from "./UserMessage.svelte";

  export let message;
</script>

{#if message.systemMessage}
  <SystemMessage {message} />
{:else}
  <UserMessage {message} />
{/if}
