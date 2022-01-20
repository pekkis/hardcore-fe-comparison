<script lang="ts">
  import { Router } from "svelte-navigator";
  import type { DuckType } from "../services/duck";
  import DuckList from "./DuckList.svelte";
  export let ducks: DuckType[];
  export let showMetadata: boolean = false;
  export let fireDuck: (id: string) => void;
</script>

<Router>
  <DuckList {showMetadata} {fireDuck} {ducks} />
</Router>
