<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <div class="icon">
    <FontAwesomeIcon icon="spinner" />
  </div>
</template>

<style scoped>
.icon {
  position: fixed;
  top: 0;
  right: 0;
  color: rgb(0 0 0);
  margin: 1em;
  z-index: 100000;
}
</style>
