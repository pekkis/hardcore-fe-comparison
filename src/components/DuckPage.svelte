<script type="ts">
  import type { DuckType } from "src/services/duck";

  export let id: string;
  export let ducks: Record<string, DuckType>;

  $: duck = ducks[id];
</script>

<section>
  {#if !duck}
    laddaring
  {:else}
    <h2><strong>{duck.lastName}</strong>, {duck.firstName}</h2>

    <p>A sad life story of a duck here.</p>
  {/if}
</section>
