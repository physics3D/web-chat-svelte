<script lang="ts">
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
