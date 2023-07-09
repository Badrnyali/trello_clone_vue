<script setup lang="ts">
import { useVModel } from "@vueuse/core"
import ADialog from "./ui-package/ADialog.vue";

const emit = defineEmits<{
  (event: "confirm"): void;
}>()

const props = defineProps<{
  taskTitle: string;
  taskDescription: string;
  visible: boolean
}>()

const visible = useVModel(props, "visible")
const title = useVModel(props, "taskTitle")
const description = useVModel(props, "taskDescription")

</script>
<template>
  <ADialog v-model:show="visible" @confirm="emit('confirm')">
    <template #content>
      <label for="title">Task Title</label>
      <input v-model="title" type="text" name="title" id="title">
      <label for="description">Task Description</label>
      <textarea v-model="description" rows="4" cols="50" name="description" id="description"></textarea>
    </template>
  </ADialog>
</template>