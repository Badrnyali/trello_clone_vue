<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import draggable from "vuedraggable"
import AddTask from "./AddTask.vue";
import { type Tasks } from "../interfaces"
import DragTasks from "./DragTasks.vue";
import { useBoardTasks } from "../stores/boardTasks"
import TaskDialog from "./TaskDialog.vue"
import { useUsers } from "../stores/users";
import threeDots from "./ui-package/threeDots.vue";

const props = defineProps({
  title: String
})

//Users store 
const useUsersStore = useUsers();
const disabled = ref(false)

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
  disabled.value = false;
}

const changeTask = () => {
  const newTask = {
    id: modifiedTask.value?.id,
    title: modifyTitle.value,
    description: modifyDescription.value,
  }
  boardTasksStore.modifyTask(newTask)
}

const displayTask = (task: Tasks) => {
  modifiedTask.value = task;
  modifyTitle.value = task.title;
  modifyDescription.value = task.description;
  modifyDialogVisible.value = true;
  disabled.value = true;
}

onMounted(async () => {
  await boardTasksStore.fetchBoardsPosts();
})
</script>
<template>
  <div v-show="loading" class="loading">Loading...</div>
  <draggable class="drag-container" :list="boardsList" group="column" item-key="id">
    <template #item="{ element: boardList }">
      <div class="drag-container__content">
        <div class="drag-container__card">
          <div class="drag-container__title">
            <p>{{ boardList.title }}</p>
            <threeDots :board-list="boardList"/>
          </div>
          <draggable class="drag-container__task" :list="boardList.tasks" group="tasks" item-key="title">
            <template #item="{ element: taskId }">
              <div v-if="tasksList.find((task: Tasks) => task.id === taskId)">
                <DragTasks :task="tasksList.find((task: Tasks) => task.id === taskId)" @task-removed="removeTask"
                  @task-modify="modifyTask" @task-display="displayTask" />
              </div>
            </template>
          </draggable>
          <div class="drag-container_controls center">
            <AddTask :id="boardList.id" @task-added="taskAdded" />
          </div>
        </div>
      </div>
    </template>
  </draggable>
  <TaskDialog v-model:disabled="disabled" v-model:visible="modifyDialogVisible" v-model:task-title="modifyTitle"
    v-model:task-description="modifyDescription" @confirm="changeTask" />
</template>

<style>
.drag-container {
  display: flex;
  position: absolute;
  overflow-x: scroll;
  padding: 25px 0;
  left: 0;
  top: 90px;
  bottom: 0;
  width: 100%;
}

.drag-container__content {
  box-sizing: border-box;
  display: inline-block;
  height: 100%;
  margin: 0 12px;
  scroll-margin: 8px;
  vertical-align: top;
  white-space: nowrap;
  min-width: 272px;
}

.drag-container__card {
  box-sizing: border-box;
  background-color: var(--very-light-blue);
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
  width: 100% !important;
  border-radius: 15px;
  padding: 20px 0px;
  -webkit-box-shadow: var(--box-shadow);
  -moz-box-shadow: var(--box-shadow);
  box-shadow: var(--box-shadow);
  padding-bottom: 0px;
}

.dark .drag-container__card {
  background-color: var(--very-dark-blue);
  color: var(--white);
}

.drag-container__task {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 7px;
  justify-content: space-between;
  margin: 0 4px;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1px 4px 0;
  z-index: 1;
}

.drag-container__title {
  position: relative;
  text-align: left;
  padding-left: 25px;
  padding-right: 15px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}


.drag-container__title p {
  margin: 0;
}

.drag-container_controls.center {
  padding-top: 15px;
  justify-content: space-around;
  overflow: hidden;
}

.drag-container_controls button {
  font-size: 14px;
}

.drag-container_controls .add-task__button {
  background-color: inherit;
  color: var(--black);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 15px 5px;
  width: 100%;
  transition: all 0.3s ease;
  border-radius: 0px 0px 15px 15px;
}
.dark .drag-container_controls .add-task__button{
  color: var(--white);
}
.drag-container_controls .add-task__button:hover {
  background-color: var(--light-blue) !important;
  transform: none;
}

.drag-container_controls .add-task__button i {
  padding-left: 20px;
  margin-right: 10px;
  font-size: 16px;
  margin-top: 2px;
}

.drag-container_controls .remove-board__button {
  background: red;
  color: white;
}
</style>

