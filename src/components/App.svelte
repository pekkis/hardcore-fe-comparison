<script lang="ts">
  import { onMount } from "svelte";
  import type { DuckProspectType, DuckType } from "../services/duck";
  import duckService from "../services/duck";
  import { cleanse } from "../services/instance";
  import Spinner from "./Spinner.svelte";
  import { Router, Route } from "svelte-navigator";
  import IndexPage from "./IndexPage.svelte";
  import DuckPage from "./DuckPage.svelte";
  import mlrdLogo from "../assets/favicon.png";

  let url = "";

  let renderCount = 0;

  let ducks: Record<string, DuckType> = {};
  let isInitialized: boolean = false;
  let operationsPending = 0;

  let duckIsBeingHired = false;

  const hireDuck = async (prospect: DuckProspectType) => {
    duckIsBeingHired = true;
    operationsPending = operationsPending + 1;

    const duck = await duckService.hireDuck(prospect);

    duckIsBeingHired = false;
    ducks[duck.id] = duck;
    operationsPending = operationsPending - 1;
  };

  const fireDuck = async (id: string) => {
    operationsPending = operationsPending + 1;
    ducks[id].isBeingFired = true;
    ducks = ducks;

    const firedDuck = await duckService.fireDuck(id);
    ducks[firedDuck.id].hasbeenFired = true;
    ducks = ducks;
    operationsPending = operationsPending - 1;

    setTimeout(() => {
      delete ducks[firedDuck.id];
      ducks = ducks;
    }, 3000);

    ducks = ducks;
  };

  onMount(() => {
    const interval = setInterval(() => {
      renderCount = renderCount + 1;
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  onMount(async () => {
    operationsPending = operationsPending + 1;
    const dux = await duckService.getDucks();
    ducks = Object.fromEntries(dux.map((d) => [d.id, d]));
    isInitialized = true;
    operationsPending = operationsPending - 1;
  });

  $: duckList = Object.values(ducks) || [];
</script>

<svelte:head>
  <title>Mrld ERP</title>
</svelte:head>

{#if operationsPending > 0}
  <Spinner />
{/if}
<header>
  <h1>
    <img width="50px" alt="Mallard ERP" src={mlrdLogo} />Mallard ERP
  </h1>
</header>

<main>
  <p>
    I have been rendered <strong>{renderCount}</strong> times!{" "}
    <button
      type="button"
      on:click={(e) => {
        console.log(e);
        e.preventDefault();
        cleanse();
      }}
    >
      cleanse
    </button>
  </p>

  <Router {url}>
    <Route path="/">
      <IndexPage {hireDuck} {isInitialized} ducks={duckList} {fireDuck} />
    </Route>
    <Route path="/duck/:id" let:params>
      <DuckPage id={params.id.substring(1)} {ducks} />
    </Route>
  </Router>
</main>

<style>
  :root {
    font-family: "Comic Sans MS", serif;
    background-image: url("/src/assets/duckling-pattern.png");
    font-size: 18px;
    background-attachment: fixed;
    background-position: top left;
  }

  :global(body) {
    margin: 0;
    padding: 0;
  }

  main {
    margin: 1em;
    padding: 0;
  }

  header {
    margin-top: 0;
    background-color: rgb(255 277 108);
    padding: 1rem;
    position: sticky;
    top: 0;
    border-bottom: 1px solid rgb(33 33 33);
    text-align: center;
    z-index: 1000;
  }

  img {
    vertical-align: middle;
    margin-right: 0.5em;
  }

  h1 {
    margin: 0;
    font-size: 30px;
  }
</style>
