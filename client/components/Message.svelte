<script lang="ts">
  import { text } from "svelte/internal";

  export let message;
</script>

<li>{message.author}: {message.text}</li>

<style>
  li {
    padding: 0.5rem 1rem;
  }
  li:nth-child(odd) {
    background: #efefef;
  }
</style>
