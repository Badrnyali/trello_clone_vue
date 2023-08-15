<script setup lang="ts">
import { ref, toRaw } from 'vue';
import threeDots from './ui-package/threeDots.vue';
import { useBoardTasks } from '../stores/boardTasks';
import { Board } from '../interfaces';

const props = defineProps<{
  boardList: Board;
}>()

const closeDots = ref<boolean>(false)
const boardTasksStore = useBoardTasks()

const duplicateCard = () => {
  const cardClone = structuredClone(toRaw(props.boardList))
  boardTasksStore.duplicateBoard(cardClone)
}

const removeBoard = (id: string) => {
  boardTasksStore.removeBoard(id);
  closeDots.value = true
}
</script>
<template>
  <threeDots :close-dots="closeDots" @close-dots="closeDots = false">
    <li class="task_menu-li" @click="duplicateCard">Duplicate Card</li>
    <li class="task_menu-li" @click="removeBoard(boardList.id)">Delete Card</li>
  </threeDots>
</template>