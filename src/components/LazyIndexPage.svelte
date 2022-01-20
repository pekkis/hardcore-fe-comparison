<script lang="ts">
  import type { DuckProspectType, DuckType } from "src/services/duck";

  import { onMount } from "svelte";

  export let isInitialized: boolean = false;
  export let fireDuck: (id: string) => void;
  export let hireDuck: (prospect: DuckProspectType) => void;
  export let ducks: DuckType[] = [];

  let Thing;

  const sleep = (ms) => new Promise((f) => setTimeout(f, ms));

  onMount(async () => {
    await sleep(1000); // simulate network delay
    Thing = (await import("./IndexPage.svelte")).default;
  });
</script>

<svelte:component this={Thing} {ducks} {isInitialized} {fireDuck} {hireDuck} />
