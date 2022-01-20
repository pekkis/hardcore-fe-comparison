<script lang="ts">
</script>

<button {...$$props} on:click><slot /></button>

<style lang="postcss">
  button {
    border: 1px solid rgb(33 33 33);
    border-radius: 0.33rem;
    padding: 0.33em;
    background-color: rgb(200 200 200);
    color: rgb(33 33 33);
    cursor: pointer;
  }

  button:hover {
    background-color: rgb(210 210 210);
    color: rgb(43 43 43);
  }

  button:disabled {
    cursor: not-allowed;
    background-color: rgb(210 210 210);
    opacity: 0.5;
  }
</style>
