<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { DuckType, getDucks } from '../services/duck';
import Duck from "./Duck.vue";

const props = defineProps<{
  ducks: DuckType[];
  fireDuck: (id: string) => void;
  showMetadata?: boolean
}>()


const averageAge = computed(() => {
  return props.ducks.reduce((a, duck) => a + duck.age, 0) / props.ducks.length;
});



</script>

<template>
  <div v-if="ducks.length > 0">
    <p
      v-if="showMetadata"
    >Number of ducks: {{ ducks.length }}, average age: {{ averageAge.toFixed(2) }}</p>

    <ul>
      <li v-for="duck in ducks" :duck="duck" :key="duck.id">
        <Duck :duck="duck" :fire-duck="fireDuck" />
      </li>
    </ul>
  </div>
  <div v-else>
    <p>zero ducks given</p>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
<style scoped>
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
