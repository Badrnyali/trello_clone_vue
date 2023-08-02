<script setup lang="ts">

const props = defineProps<{
  id: string
}>()

const emits = defineEmits<{
  (event: "delete-board", id: string): void
}>()
</script>
<template>
  <button class="remove-board__button" @click="emits('delete-board', props.id)">Delete</button>
</template>