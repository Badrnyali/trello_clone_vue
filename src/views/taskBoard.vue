<script setup lang="ts">
import { ref } from "vue"
import AddBoard from "../components/AddBoard.vue";
import DragBoard from "../components/DragBoard.vue";

const boardTitle = ref();

const boardAdded = (title: string) => {
  boardTitle.value = title;
}
</script>

<template>
  <AddBoard @board-added="boardAdded" />
  <DragBoard :title="boardTitle" />
</template>
