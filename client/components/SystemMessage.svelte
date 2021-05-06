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
    list-style: none;
    color: var(--text-color);
    display: flex;
    align-items: center;
    background-color: var(--dark-bg-color);
    margin: 0;
    padding: 0.5rem;
    border-radius: 0;
    float: none;
    clear: both;
    justify-content: center;
  }
</style>
