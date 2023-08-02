<template>
  <TestChild v-for="(item, index) in list" :key="index" :text="item"
    :ref="el => blockElements[index] = (el as unknown as typeof TestChild)" />
</template>

<script setup lang="ts">
import TestChild from "./TestChild.vue"
import { onMounted, ref } from "vue"

const blockElements = ref<typeof TestChild[]>([])
const list = ["0", "1", "2"]

onMounted(() => {
  blockElements.value[2].consoleName();
  console.log(blockElements.value[0].$el)
  console.log(blockElements.value[1].$el)
  blockElements.value[1].consoleText();
  blockElements.value[2].consoleText();

})
</script>