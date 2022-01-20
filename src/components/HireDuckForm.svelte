<script type="ts">
  import type { DuckProspectType } from "src/services/duck";
  import { form as createForm, field } from "svelte-forms";
  import { min } from "svelte-forms/validators";
  import Button from "./Button.svelte";
  import { v4 } from "uuid";

  export let hireDuck: (prospect: DuckProspectType) => void;

  const firstName = field("firstName", "", [min(4)]);
  const lastName = field("lastName", "", [min(4)]);
  const myForm = createForm(firstName, lastName);

  const submit = (e) => {
    e.preventDefault();

    console.log({
      $firstName,
      $lastName
    });

    const prospect: DuckProspectType = {
      firstName: $firstName.value,
      lastName: $lastName.value,
      id: v4(),
      gender: 1,
      migratesForWinters: false,
      relatedToCEO: false,
      birthDay: "2020-06-13",
      wingedness: "r",
      isAdmin: false,
      email: "faker@fake.com"
    };

    hireDuck(prospect);

    firstName.reset();
    lastName.reset();
  };
</script>

<form on:submit={submit}>
  <div class="group">
    <label for="firstName">first name</label>
    <input name="firstName" type="text" bind:value={$firstName.value} />
    {#if $myForm.hasError("firstName.min")}
      <div>First name is required</div>
    {/if}
  </div>
  <div class="group">
    <label for="lastName">last name</label>
    <input type="lastName" bind:value={$lastName.value} />
    {#if $myForm.hasError("lastName.min")}
      <div>Last name is required</div>
    {/if}
  </div>

  <div class="group">
    <Button type="submit" disabled={!$myForm.valid || $myForm.dirty}
      >hire</Button
    >
  </div>
</form>

<style>
  .group {
    margin: 0.25em 0;
  }

  label {
    display: block;
    font-weight: bold;
  }
</style>
