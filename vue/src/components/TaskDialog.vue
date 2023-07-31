<script setup lang="ts">
import { useVModel } from "@vueuse/core"
import ADialog from "./ui-package/ADialog.vue";

const emit = defineEmits<{
  (event: "confirm"): void;
}>()

const props = withDefaults(defineProps<{
  taskTitle: string;
  taskDescription: string;
  visible: boolean;
  disabled?: boolean;
}>(), {
  disabled: false
})

const visible = useVModel(props, "visible")
const title = useVModel(props, "taskTitle")
const description = useVModel(props, "taskDescription")
const isDisabled = useVModel(props, "disabled");

</script>
<template>
  <ADialog v-model:show="visible" @confirm="emit('confirm')" v-model:disabled="isDisabled">
    <template #content>
      <label for="title">Task Title</label>
      <input v-model="title" type="text" name="title" id="title" :readonly="disabled">
      <label for="description">Task Description</label>
      <textarea v-model="description" rows="4" cols="50" name="description" id="description"
        :readonly="disabled" ></textarea>
    </template>
  </ADialog>
</template>