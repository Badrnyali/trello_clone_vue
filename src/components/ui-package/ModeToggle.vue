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
  transition: 0.3s all ease;
  margin-right: 20px;
  padding: 4px 6px;
  border-radius: 4px;
}
button:hover{
  background-color: var(--very-light-blue);
  transform: none;
}
.fa {
  color: var(--white);
}
button:hover .fa{
  color: var(--very-dark-blue) !important;
}
</style>