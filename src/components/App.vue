<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, onUpdated, computed } from 'vue'
import mlrdLogo from "../assets/favicon.png";
import { DuckProspectType, DuckType } from '../services/duck';
import Spinner from "./Spinner.vue";
import duckService from "../services/duck";
import { cleanse as cleanseSrv } from "../services/instance";
import DuckList from './DuckList.vue';
import HireDuckForm from './HireDuckForm.vue';
import { RouterView } from 'vue-router';
import { useDuckStore } from "../stores/duckStore";

let renderCount = ref<number>(0)

const duckStore = useDuckStore();

const cleanse = async () => {
  console.log('CLEANSING')
  await cleanseSrv()
  console.log('CLEANSED!')
}

let interval: number | undefined

onMounted(() => {
  interval = setInterval(() => {
    renderCount.value = renderCount.value + 1;
  }, 1000);

});

onMounted(async () => {
  duckStore.getDucks();
});

onBeforeUnmount(() => {
  clearInterval(interval);
})

</script>

<template>
  <header>
    <h1>
      <img width="50" alt="Mallard ERP" v-bind:src="mlrdLogo" />Mallard ERP
    </h1>
    <Spinner v-if="duckStore.numberOfOperations > 0" />
  </header>

  <main v-bind="$attrs">
    <RouterView />
  </main>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
<style scoped>
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

a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
h1 {
  margin: 0;
  font-size: 30px;
}

main {
  margin: 1em;
  padding: 0;
}

img {
  vertical-align: middle;
  margin-right: 0.5em;
}
</style>
