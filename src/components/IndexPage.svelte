<script type="ts">
  import type { DuckProspectType, DuckType } from "src/services/duck";
  import DuckList from "./DuckList.svelte";
  import HireDuckForm from "./HireDuckForm.svelte";

  export let isInitialized: boolean = false;
  export let fireDuck: (id: string) => void;
  export let hireDuck: (prospect: DuckProspectType) => void;
  export let ducks: DuckType[] = [];

  const isGood = (duck: DuckType) => {
    if (duck.relatedToCEO) {
      return true;
    }

    return duck.age < 8 && duck.age >= 1 && !duck.migratesForWinters;
  };

  $: goodDucks = ducks.filter(isGood);
  $: badDucks = ducks.filter((d) => !isGood(d));
</script>

<HireDuckForm {hireDuck} />

{#if !isInitialized}
  <em>HOLD YER HORSES!</em>
{:else}
  <h2>Bad Ducks</h2>
  <DuckList {fireDuck} ducks={badDucks} showMetadata />
  <h2>Good Ducks</h2>
  <DuckList {fireDuck} ducks={goodDucks} />
{/if}

<style>
  h2 {
    margin-top: 2em;
    margin-bottom: 1em;
  }
</style>
