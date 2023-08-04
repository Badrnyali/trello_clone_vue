<script setup lang="ts">
import { ref, watch } from "vue";
import { Tasks } from "../interfaces";
import TaskDialog from "./TaskDialog.vue";

const props = defineProps<{
  id: string;
}>()

const emit = defineEmits<{
  (event: "task-added", task: Tasks): void
}>();

const isVisible = ref<boolean>(false)
const taskTitle = ref<string>("");
const taskDescription = ref<string>("");

const emptyInput = () => {
  taskTitle.value = "";
  taskDescription.value = ""
}

const taskAdded = () => {
  const task = {
    title: taskTitle.value,
    id: props.id,
    description: taskDescription.value,
  }
  emit("task-added", task);
  emptyInput();
}

watch(() => isVisible.value, () => {
  if (isVisible.value) {
    emptyInput()
  }
})
</script>
<template>
  <button @click="isVisible = true" class="add-task__button">
    <i class="fa fa-plus"></i>
    <p>Add a task</p>
  </button>
  <TaskDialog v-model:visible="isVisible" v-model:task-title="taskTitle" v-model:task-description="taskDescription"
    @confirm="taskAdded" />
</template>

<style scoped></style>