<script setup lang="ts">
import { ref, watch } from "vue";
import { Tasks } from "../interfaces";
import TaskDialog from "./TaskDialog.vue";
import { Priority } from "../constants/constant";

const props = defineProps<{
  id: string;
}>()

const emit = defineEmits<{
  (event: "task-added", task: Tasks): void
}>();

const isVisible = ref<boolean>(false)
const taskTitle = ref<string>("");
const taskDescription = ref<string>("");
const taskPriority = ref<typeof Priority | string>("")
const taskScore = ref<undefined | number>();


const emptyInput = () => {
  taskTitle.value = "";
  taskDescription.value = ""
  taskPriority.value = ""
  taskScore.value = undefined
}

const taskAdded = () => {
  const task = {
    title: taskTitle.value,
    id: props.id,
    description: taskDescription.value,
    priority: taskPriority.value,
    score: taskScore.value,
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
    v-model:priority="taskPriority" v-model:score="taskScore" @confirm="taskAdded" />
</template>

<style scoped></style>