<template>
  <div ref="content">{{ text }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  text: string
}>()

const content = ref(null)

function consoleName() {
  return console.log("Badr")
}

function consoleText() {
  return console.log("my value", props.text)
}

defineExpose({
  content,
  consoleName,
  consoleText,
})

</script>