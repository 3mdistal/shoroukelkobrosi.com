<script lang="ts">
  import { actions } from "astro:actions";

  let message = "empty string";
  let messageElement: HTMLParagraphElement;
  let form: HTMLFormElement;

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(form);
    const result = await actions.homepage.mediaInput(formData);
    if (result.error) {
      return;
    } else {
      message = result.data.message;
      messageElement.style.opacity = "1";
      form.reset(); // Reset the form fields
      setTimeout(() => {
        messageElement.style.opacity = "0";
        setTimeout(() => {
          message = "empty string";
        }, 1000);
      }, 2000);
    }
  }
</script>

<form bind:this={form} on:submit={handleSubmit}>
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

  <p bind:this={messageElement}>{message}</p>
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

  p {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
</style>
