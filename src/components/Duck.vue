<script setup lang="ts">
import { defineProps } from 'vue'
import { DuckType } from '../services/duck';
import Button from './Button.vue';

const props = defineProps<{
  duck: DuckType
  fireDuck: (id: string) => void;
}>()

const fire = () => {
  props.fireDuck(props.duck.id);
}

</script>

<template>
  <div class="duck" v-bind:class="{ female: duck.gender === 1, male: duck.gender === 0 }">
    <div class="info">
      <div class="name">
        <strong>{{ duck.lastName }}</strong>
        , {{ duck.firstName }}
      </div>
      <div class="block">
        <em>{{ duck.age.toFixed(2) }} y</em>
      </div>
      <div class="block">opinion on migration: {{ duck.migratesForWinters ? "👍" : "👎" }}</div>
      <div class="block">related to the boss: {{ duck.relatedToCEO ? "✔" : "✖" }}</div>
    </div>

    <div class="actions">
      <Button v-bind:disabled="duck.isBeingFired" @click="fire" type="button">free</Button>
    </div>
  </div>
</template>

<style scoped>
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
