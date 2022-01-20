<script lang="ts">
  import type { DuckType } from "src/services/duck";
  import Duck from "./Duck.svelte";
  export let ducks: DuckType[];
  export let showMetadata: boolean = false;
  export let fireDuck: (id: string) => void;
  import { fly } from "svelte/transition";
  import { sortWith, descend, ascend, prop } from "ramda";

  const duckSorter = sortWith<DuckType>([
    ascend(prop("lastName")),
    ascend(prop("firstName"))
  ]);

  $: averageAge = ducks.reduce((a, d) => a + d.age, 0) / ducks.length;

  $: sortedDucks = duckSorter(ducks);
</script>

{#if ducks.length > 0}
  <ul>
    {#if showMetadata}
      <p>
        Number of ducks: {ducks.length}, average age: {averageAge.toFixed(2)}
      </p>
    {/if}

    {#each sortedDucks as duck (duck.id)}
      {#if !duck.hasbeenFired}
        <li
          in:fly={{
            delay: 250,
            duration: 300,
            x: -1000
            //opacity: 0.5
            // easing: quintOut
          }}
          out:fly|local={{
            delay: 250,
            duration: 300,
            x: 1000
          }}
        >
          <Duck {fireDuck} {duck} />
        </li>
      {/if}
    {/each}
  </ul>
{:else}
  <p>Zero ducks given.</p>
{/if}

<style>
  ul {
    list-style-type: none;
    margin: 2em 0;
    padding: 0;
  }

  li:first-child {
    margin-top: 0;
  }

  li:last-child {
    margin-bottom: 0;
  }
</style>
