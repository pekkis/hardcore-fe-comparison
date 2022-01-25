<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, onUpdated, computed } from 'vue'
import mlrdLogo from "../assets/favicon.png";
import { DuckType } from '../services/duck';
import Spinner from "./Spinner.vue";
import duckService from "../services/duck";
import { cleanse as cleanseSrv } from "../services/instance";
import DuckList from './DuckList.vue';

let renderCount = ref<number>(0)

let state = reactive<{
  ducks: Record<string, DuckType>;
  numberOfOperations: number;
  isInitialized: boolean;
}>({
  numberOfOperations: 0,
  ducks: {},
  isInitialized: false
})

const isGood = (duck: DuckType) => {
  if (duck.relatedToCEO) {
    return true;
  }

  return duck.age < 8 && duck.age >= 1 && !duck.migratesForWinters;
};


const badDucks = computed(() => {
  return Object.values(state.ducks).filter(d => !isGood(d))
})

const goodDucks = computed(() => {
  return Object.values(state.ducks).filter(isGood)
})

const cleanse = async () => {
  console.log('CLEANSING')
  await cleanseSrv()
  console.log('CLEANSED!')
}

const fireDuck = async (id: string) => {
  state.ducks[id].isBeingFired = true
  state.numberOfOperations = state.numberOfOperations + 1
  await duckService.fireDuck(id)
  state.numberOfOperations = state.numberOfOperations - 1
  delete state.ducks[id]
}

let interval: number | undefined

onMounted(() => {
  interval = setInterval(() => {
    renderCount.value = renderCount.value + 1;
  }, 1000);

});

onMounted(async () => {

  state.numberOfOperations = state.numberOfOperations + 1;
  const ret = await duckService.getDucks()
  state.numberOfOperations = state.numberOfOperations - 1;
  state.ducks = Object.fromEntries(ret.map(d => [d.id, d]))
  state.isInitialized = true
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
    <Spinner v-if="state.numberOfOperations > 0" />
  </header>

  <main v-bind="$attrs">
    <div v-if="state.isInitialized">
      <p>
        Rendered {{ renderCount }} times!
        <button @click="cleanse">cleanse</button>
      </p>

      <h2>Bad ducks</h2>
      <DuckList :fire-duck="fireDuck" :ducks="badDucks" showMetadata />

      <h2>Good ducks</h2>
      <DuckList :fire-duck="fireDuck" :ducks="goodDucks" />
    </div>
    <div v-else>
      <em>HOLD YER HORSES!</em>
    </div>
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
