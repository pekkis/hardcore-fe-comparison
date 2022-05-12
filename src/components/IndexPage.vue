<script setup lang="ts">
import { computed } from 'vue'
import { DuckType } from '../services/duck';
import DuckList from './DuckList.vue';
import HireDuckForm from './HireDuckForm.vue';
import { useDuckStore } from "../stores/duckStore";

const duckStore = useDuckStore();

const isGood = (duck: DuckType) => {
  if (duck.relatedToCEO) {
    return true;
  }

  return duck.age < 8 && duck.age >= 1 && !duck.migratesForWinters;
};


const badDucks = computed(() => {
  return Object.values(duckStore.ducks).filter(d => !isGood(d))
})

const goodDucks = computed(() => {
  return Object.values(duckStore.ducks).filter(isGood)
})


</script>

<template>
  <section>
    <div v-if="duckStore.isInitialized">
      <HireDuckForm
        :hire-duck="duckStore.hireDuck"
        :duck-is-being-hired="duckStore.duckIsBeingHired"
      />

      <h2>Bad ducks</h2>
      <DuckList :fire-duck="duckStore.fireDuck" :ducks="badDucks" showMetadata />

      <h2>Good ducks</h2>
      <DuckList :fire-duck="duckStore.fireDuck" :ducks="goodDucks" />
    </div>
    <div v-else>
      <em>HOLD YER HORSES!</em>
    </div>
  </section>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
