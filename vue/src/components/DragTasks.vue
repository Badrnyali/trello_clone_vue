<script setup lang="ts">
import type { Tasks } from '../interfaces';

defineProps<{
  task: Tasks;
}>();

const emits = defineEmits<{
  (event: "task-removed", id: string): void;
  (event: "task-modify", task: Tasks): void
}>();

</script>
<template>
  <div class="drag-task__card">
    <h5>{{ task.title }}</h5>
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
  background-color: var(--very-light-blue);
  padding: 15px 10px 15px 15px;
  margin: 10px 20px;
  border-radius: 4px;
  color: dark;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drag-task__card button {
  background-color: transparent;
  padding: 1px 2px;
  border-radius: 2px;
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