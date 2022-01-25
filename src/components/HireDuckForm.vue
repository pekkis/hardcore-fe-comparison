<script setup lang="ts">
import { defineProps, ref } from 'vue';
import Button from './Button.vue';
import { DuckProspectType } from '../services/duck';
import { v4 } from 'uuid';

const props = defineProps<{
  hireDuck: (prospect: DuckProspectType) => void;
  duckIsBeingHired: boolean;
}>()

const firstName = ref<string>('');
const lastName = ref<string>('');

const valid = () => {
  return firstName.value.length >= 3 && lastName.value.length >= 3
}


const submit = async (e: Event) => {

  e.preventDefault()

  const prospect: DuckProspectType = {
    firstName: firstName.value,
    lastName: lastName.value,
    id: v4(),
    gender: 1,
    migratesForWinters: false,
    relatedToCEO: false,
    birthDay: "2020-06-13",
    wingedness: "r",
    isAdmin: false,
    email: "faker@fake.com"
  };

  props.hireDuck(prospect);

  firstName.value = '';
  lastName.value = '';
}

</script>

<template>
  <form @submit="submit">
    <div class="group">
      <label for="firstName">first name</label>
      <input name="firstName" v-model="firstName" type="text" />
    </div>
    <div class="group">
      <label for="lastName">last name</label>
      <input v-model="lastName" type="lastName" />
    </div>

    <div class="group">
      <Button v-bind:disabled="props.duckIsBeingHired || !valid()" type="submit">hire</Button>
    </div>
  </form>
</template>

<style scoped>
.group {
  margin: 0.25em 0;
}

label {
  display: block;
  font-weight: bold;
}
</style>
