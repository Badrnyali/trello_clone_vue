<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import draggable from "vuedraggable"
import AddTask from "./AddTask.vue";
import { type Tasks } from "../interfaces"
import DragTasks from "./DragTasks.vue";
import { useBoardTasks } from "../stores/boardTasks"
import RemoveBoard from "./RemoveBoard.vue";
import TaskDialog from "./TaskDialog.vue"
import { useUsers } from "../stores/users";

const props = defineProps({
  title: String
})

//Users store 
const useUsersStore = useUsers();

//toggle modify dialog
const modifyDialogVisible = ref<boolean>(false);

const modifiedTask = ref<Tasks>();
const modifyTitle = ref<string>("");
const modifyDescription = ref<string>("");

const loading = computed(() => boardTasksStore.getBoardTasks.loading)
const boardTasksStore = useBoardTasks();

//Storing the board and Tasks in variable to remain reactive
const boardsList = computed(() => {
  return boardTasksStore.getBoardTasks.boardsList.filter((board) => {
    if (board.userId === useUsersStore.currentUserId) {
      return board
    }
  })
});

const tasksList = computed(() => boardTasksStore.getBoardTasks.tasksList);


watch(() => props.title, async () => {
  if (props.title?.length) {
    boardTasksStore.createBoard(props.title);
  }
})
//Add a Task to the 
const taskAdded = (task: Tasks) => {
  boardTasksStore.taskAdded(task);
}

const removeTask = (id: string) => {
  boardTasksStore.removeTask(id)
}

const modifyTask = (task: Tasks) => {
  modifiedTask.value = task;
  modifyTitle.value = task.title;
  modifyDescription.value = task.description;
  modifyDialogVisible.value = true;
}

const changeTask = () => {
  const newTask = {
    id: modifiedTask.value?.id,
    title: modifyTitle.value,
    description: modifyDescription.value,
  }
  boardTasksStore.modifyTask(newTask)
}

const boardDeleted = (id: string) => {
  boardTasksStore.removeBoard(id)
}

onMounted(async () => {
  await boardTasksStore.fetchBoardsPosts();
})
</script>
<template>
  <div v-show="loading" class="loading">Loading...</div>
  <draggable class="drag-container" :list="boardsList" group="column" item-key="id">
    <template #item="{ element: boardList }">
      <div class="drag-container__card">
        <h3>
          {{ boardList.title }}
        </h3>
        <draggable class="drag-container__task" :list="boardList.tasks" group="tasks" item-key="title">
          <template #item="{ element: taskId }">
            <div v-if="tasksList.find((task: Tasks) => task.id === taskId)">
              <DragTasks :task="tasksList.find((task: Tasks) => task.id === taskId)" @task-removed="removeTask"
                @task-modify="modifyTask" />
            </div>
          </template>
        </draggable>
        <div class="drag-container_controls center">
          <AddTask :id="boardList.id" @task-added="taskAdded" />
          <RemoveBoard :id="boardList.id" @delete-board="boardDeleted" />
        </div>
      </div>
    </template>
  </draggable>
  <TaskDialog v-model:visible="modifyDialogVisible" v-model:task-title="modifyTitle"
    v-model:task-description="modifyDescription" @confirm="changeTask" />
</template>

<style>
.drag-container {
  min-width: 100vw;
  display: flex;
  position: relative;
  margin: 0px 10px;
}

.drag-container__card {
  width: 210px;
  min-height: 480px;
  background-color: #fff;
  border-radius: 15px;
  margin-right: 15px;
  padding: 15px 10px;
  -webkit-box-shadow: 4px 4px 10px 0px var(--light-blue);
  -moz-box-shadow: 4px 4px 10px 0px var(--light-blue);
  box-shadow: 4px 4px 10px 0px var(--light-blue);
}
.dark .drag-container__card{
  background-color: #20212c;
  -webkit-box-shadow: 4px 4px 10px 0px #20212c;
  -moz-box-shadow: 4px 4px 10px 0px #20212c;
  box-shadow: 4px 4px 10px 0px #20212c;
  color: #fff;
}

.drag-container__task {
  min-width: 100%;
  min-height: inherit;
  max-height: 480px;
  overflow-y: auto;
}

.drag-container_controls {
  justify-content: space-between !important;
}

.drag-container_controls button {
  font-size: 14px;
}

.drag-container_controls .remove-board__button {
  background: red;
  color: white;
}
</style>

