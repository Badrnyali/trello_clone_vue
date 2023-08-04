<script setup lang="ts">
import type { Tasks } from '../interfaces';

defineProps<{
  task: Tasks;
}>();

const emits = defineEmits<{
  (event: "task-removed", id: string): void;
  (event: "task-modify", task: Tasks): void;
  (event: "task-display", task: Tasks): void;
}>();

</script>
<template>
  <div class="drag-task__card" @click.self="emits('task-display', task)">
    <p>{{ task.title }}</p>
    <div class="drag-task__control">
      <button @click="emits('task-modify', task)">
        <i class="fa fa-pencil"></i>
      </button>
      <button>
        <i class="fa fa-remove" @click="emits('task-removed', task.id)"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.drag-task__card {
  background-color: var(--white);
  padding: 15px 10px 15px 15px;
  margin: 10px 20px;
  border-radius: 4px;
  color: var(--black);
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  -webkit-box-shadow: var(--box-shadow);
  -moz-box-shadow: var(--box-shadow);
  box-shadow: var(--box-shadow);
  transition: 0.3s all ease;
}

.drag-task__control {
  opacity: 0;
  transition: 0.3s all ease;
}

.drag-task__card:hover {
  background-color: var(--very-light-blue);
}

.drag-task__card:hover .drag-task__control {
  opacity: 1;
}

.dark .drag-task__card {
  background-color: var(--very-light-blue);
  color: var(--black);
}

.dark .drag-task__card:hover {
  background-color: var(--white);
}

.drag-task__card button {
  background-color: transparent;
  padding: 3px 6px;
  border-radius: 5px;
}

.drag-task__card button:hover {
  background-color: #9db2bf19;
}

.drag-task__card button:not(:last-child) {
  margin-right: 10px;
}

.drag-task__card .fa-remove {
  color: red;
}
</style>