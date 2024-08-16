<script lang="ts">
  import { useChat } from "@ai-sdk/svelte";

  const { input, handleSubmit, messages } = useChat({
    api: "/api/chat.json",
  });
</script>

<div>
  <ul>
    {#each $messages as message}
      <li>{message.role === "user" ? "User" : "AI"}: {message.content}</li>
    {/each}
  </ul>
  <form on:submit={handleSubmit}>
    <input type="text" bind:value={$input} />
    <button type="submit">Send</button>
  </form>
</div>

<style>
  ul {
    padding: 0;
    list-style: none;
  }
</style>
