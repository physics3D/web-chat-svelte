<script lang="ts">
  import Message from "../components/Message.svelte";

  export let messages;
</script>

<ul>
  {#each messages as message}
    <Message {message} />
  {/each}
</ul>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>
