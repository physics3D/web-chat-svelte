<script lang="ts">
  type Message = {
    author: string;
    text: string;
    systemMessage: boolean;
  };

  export let message: Message;
</script>

<li>{message.text}</li>

<style>
  li {
    padding: 0.5rem 1rem;
  }
  li:nth-child(odd) {
    background: #efefef;
  }
</style>
