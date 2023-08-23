<script setup lang="ts">
import { computed, ref } from "vue";
import type { Tasks } from '../interfaces';
import threeDots from "./ui-package/threeDots.vue";
import { useBoardTasks } from "../stores/boardTasks";

const props = defineProps<{
  task: Tasks;
  boardId: string;
}>();

const emits = defineEmits<{
  (event: "task-removed", id: string): void;
  (event: "task-modify", task: Tasks): void;
  (event: "task-display", task: Tasks): void;
}>();

const boardTasksStore = useBoardTasks()

const closeDots = ref<boolean>(false);

const priorityStyle = computed(() => {
  if (props.task.priority === 'High') {
    return {
      color: 'red'
    }
  }
  if (props.task.priority === 'Medium') {
    return {
      color: 'orange'
    }
  }
  return
})

const modifyTask = (task: Tasks) => {
  emits('task-modify', task)
  closeDots.value = true;
}

const duplicateTask = (task: Tasks) => {
  boardTasksStore.duplicateTask(task.id, props.boardId)
}
const deleteTask = (task: Tasks) => {
  emits('task-removed', task.id)
  closeDots.value = true;
}
</script>
<template>
  <div class="drag-task__card" @click="emits('task-display', task)">
    <div>
      <p>        
        {{ task.title }}
        <span v-show="task.priority" class="drag__task-priority" :style="priorityStyle">
          <i class="fa fa-angle-double-up"></i>
        </span>
        <span v-show="task.score" class="drag__task-priority drag__task-score">
          {{ task.score }}
        </span>
      </p>
      <threeDots :close-dots="closeDots" @close-dots="closeDots = false">
        <li class="task_menu-li" @click.stop="duplicateTask(task)">Duplicate Task</li>
        <li class="task_menu-li" @click.stop="modifyTask(task)">Modify Task</li>
        <li class="task_menu-li" @click.stop="deleteTask(task)">Delete Task</li>
      </threeDots>
    </div>

  </div>
</template>

<style scoped>
.drag-task__card {
  position: relative;
  background-color: var(--white);
  padding: 10px 10px 10px 15px;
  margin: 10px 20px;
  border-radius: 4px;
  color: var(--black);
  font-weight: 500;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  -webkit-box-shadow: var(--box-shadow);
  -moz-box-shadow: var(--box-shadow);
  box-shadow: var(--box-shadow);
  transition: 0.3s all ease;
}

.drag__task-score{
  padding: 2px 4px !important;
  background-color: var(--dark-blue);
  border-radius: 50%;
  color: var(--white);
  font-size: 12px !important;
  -webkit-box-shadow: var(--box-shadow);
  -moz-box-shadow: var(--box-shadow);
  box-shadow: var(--box-shadow);
}
.dark .drag__task-score{
  background-color: var(--light-blue);
  color: var(--black);
}
.drag-task__card>div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.drag-task__card:hover {
  background-color: var(--very-light-blue);
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

.drag__task-priority {
  position: relative;
  padding: 0;
  padding-top: 5px;
  margin-left: 5px;
  font-size: 18px;
  font-weight: bolder;
  cursor: pointer;
}
</style>