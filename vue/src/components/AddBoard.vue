<script setup lang="ts">
import { ref, watch } from "vue";
import ADialog from "./ui-package/ADialog.vue";

const emit = defineEmits<{
  (event: "board-added", title: string): void
}>();

const dialogTitle = ref<string>("");
const isVisible = ref<boolean>(false);

const showDialog = () => {
  isVisible.value = true;
}

const confirm = () => {
  emit('board-added', dialogTitle.value)
}

watch(() => isVisible.value, () => {
  if (isVisible.value) {
    return dialogTitle.value = ""
  }
})
</script>
<template>
  <button class="add-board" @click="showDialog()">+</button>
  <ADialog v-model:show="isVisible" @confirm="confirm">
    <template #content>
      <label for="title">What would you like to name your board?</label>
      <input v-model="dialogTitle" type="text" name="title" id="title">
    </template>
  </ADialog>
</template>
