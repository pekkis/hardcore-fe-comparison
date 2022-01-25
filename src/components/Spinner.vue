<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <div class="icon">
    <FontAwesomeIcon icon="spinner" class="rubals" />
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
.rubals {
  animation-duration: 5s;
  animation-name: rubale;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes rubale {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(359deg);
  }
}
</style>
