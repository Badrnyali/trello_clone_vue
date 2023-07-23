<script setup lang="ts">
import { useDark } from '@vueuse/core';


const isDark = useDark();

const handleMode = () => {
  if (isDark.value) {
    return isDark.value = false;
  }
  return isDark.value = true;
}
</script>

<template>
  <button @click.prevent="handleMode">
    <i class="fa" :class="{'fa-moon-o': !isDark,  'fa-sun-o' : isDark}"></i>
  </button>
</template>

<style scoped>
button {
  background-color: transparent;
  transition: 1s all ease;
}
.fa {
  color: var(--white);
}
</style>