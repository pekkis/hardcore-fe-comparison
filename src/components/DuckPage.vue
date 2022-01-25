<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { DuckType } from '../services/duck';
import DuckList from './DuckList.vue';
import HireDuckForm from './HireDuckForm.vue';
import { useDuckStore } from "../stores/duckStore";

const props = defineProps<{
  id: string
}>();

const duckStore = useDuckStore();

const duck = computed<DuckType | undefined>(() => {
  return duckStore.ducks[props.id];
})

</script>

<template>
  <section v-if="duck">
    <h2>{{ duck.lastName }}, {{ duck.firstName }}</h2>

    <p>A sad life story of a duck here.</p>
  </section>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
<style scoped>
</style>
