<script lang="ts">
  type Message = {
    author: string;
    text: string;
    systemMessage: boolean;
  };

  export let message: Message;
</script>

<li>
  <img src="assets/person.svg" class="person_image" alt="" />
  <span class="message_body">
    <div class="author">
      {message.author}
    </div>
    {message.text}
  </span>
</li>

<style>
  li {
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    border-radius: 1rem;
    float: left;
    clear: both;
    color: var(--text-color);
    display: flex;
    align-items: center;
  }

  .message_body {
    margin-top: 0.5rem;
  }

  .author {
    color: var(--author-color);
  }

  .person_image {
    height: 2rem;
    margin: 0.5rem;
    filter: grayscale() invert();
  }
</style>
