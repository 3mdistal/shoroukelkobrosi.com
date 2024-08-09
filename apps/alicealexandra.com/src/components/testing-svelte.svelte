<script lang="ts">
  const name = "Alice";
  let count = $state(0);
</script>

<p>Hello {name}, this is a Svelte component.</p>
<button onclick={() => count++}>{count}</button>
