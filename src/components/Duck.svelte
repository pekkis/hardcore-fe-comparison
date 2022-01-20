<script lang="ts">
  import { Link } from "svelte-routing";
  import type { DuckType } from "src/services/duck";
  import Button from "./Button.svelte";
  export let duck: DuckType;
  export let fireDuck: (id: string) => void;
</script>

<svelte:head>
  <title>{duck.lastName}, {duck.firstName} - Mallard ERP</title>
</svelte:head>

<div
  class="duck"
  class:male={duck.gender === 0}
  class:female={duck.gender === 1}
>
  <div class="info">
    <div class="name">
      <Link to={`/duck/:${duck.id}`}>
        <strong>{duck.lastName}</strong>, {duck.firstName}
      </Link>
    </div>
    <div class="block">
      <em>{duck.age.toFixed(2)} y</em>
    </div>
    <div class="block">
      opinion on migration: {duck.migratesForWinters ? "👍" : "👎"}
    </div>
    <div class="block">
      related to the boss: {duck.relatedToCEO ? "✔" : "✖"}
    </div>
  </div>

  <div class="actions">
    <Button
      disabled={duck.isBeingFired}
      on:click={() => {
        fireDuck(duck.id);
      }}
      type="button"
    >
      free
    </Button>
  </div>
</div>

<style>
  .duck {
    border: 5px solid rgb(0 0 0);
    border-radius: 1rem;
    margin: 1em 0;
    padding: 1em;
    background-color: rgb(255 255 255 / 75%);
    display: flex;
    align-items: stretch;
  }

  .male {
    background-color: rgb(200 200 255 / 75%);
  }

  .female {
    background-color: rgb(255 200 200 / 75%);
  }

  .name {
    margin: 0.25em 0 0.5em 0;
  }

  .info {
    width: 75%;
  }

  .block {
    margin: 0.25em 0;
  }

  .actions {
    width: 25%;
    align-self: center;
    text-align: right;
  }
</style>
