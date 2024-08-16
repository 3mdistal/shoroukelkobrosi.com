<script lang="ts">
  import { actions } from "astro:actions";

  let message: string;

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const result = await actions.homepage.mediaInput(formData);
    if (result.error) {
      return;
    } else {
      message = result.data.message;
    }
  }
</script>

<form on:submit={handleSubmit}>
  <label for="title">Title:</label>
  <input type="text" id="title" name="title" required />

  <label for="type">Type:</label>
  <select id="type" name="mediaType" required>
    <option value="movie">Movie</option>
    <option value="tvshow">TV Show</option>
    <option value="book">Book</option>
    <option value="game">Game</option>
    <option value="music">Music</option>
    <option value="podcast">Podcast</option>
    <option value="youtubevideo">YouTube Video</option>
    <option value="weblink">Weblink</option>
  </select>

  <button type="submit">Add Media</button>
  {#if message}
    <p>{message}</p>
  {/if}
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0 auto;
    max-width: 300px;
  }

  label {
    font-weight: bold;
  }

  input,
  select {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.5rem;
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: #0077cc;
    padding: 0.5rem 1rem;
    color: white;
  }

  button:hover {
    background-color: #005fa3;
  }
</style>
