<script setup lang="ts">
import { useVModel } from "@vueuse/core"
import ADialog from "./ui-package/ADialog.vue";
import FiltersTask from "./ui-package/FiltersTask.vue";
import { Priority } from "../constants/constant";

const emit = defineEmits<{
  (event: "confirm"): void;
}>()

const props = withDefaults(defineProps<{
  taskTitle: string;
  taskDescription: string;
  visible: boolean;
  disabled?: boolean;
  priority: typeof Priority | string;
}>(), {
  disabled: false
})

const visible = useVModel(props, "visible")
const title = useVModel(props, "taskTitle")
const description = useVModel(props, "taskDescription")
const priority = useVModel(props, "priority")
const isDisabled = useVModel(props, "disabled");

const filtersHandler = (item: typeof Priority | string)=> {
  priority.value = item
}
</script>
<template>
  <ADialog v-model:show="visible" @confirm="emit('confirm')" v-model:disabled="isDisabled">
    <template #content>
      <div class="filters">
        <p>Filters</p>
        <ul class="filters__ul">
          <FiltersTask :priority="priority" @filters-clicked="filtersHandler"/>
        </ul>
      </div>
      <label for="title">Task Title</label>
      <input v-model="title" type="text" name="title" id="title" :readonly="disabled">
      <label for="description">Task Description</label>
      <textarea v-model="description" rows="4" cols="50" name="description" id="description"
        :readonly="disabled"></textarea>
    </template>
  </ADialog>
</template>
<style>
.filters p {
  font-weight: bolder;
  color: var(--black);
  text-align: left;
}
.filters__ul {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 0;
  margin-top: 5px;
  margin-bottom: 25px;
}
.filters__ul-li {
  padding: 5px 15px;
  background-color: var(--medium-blue);
  color: var(--black);
  border-radius: 10px;
  margin-right: 15px;
  width: fit-content;
  cursor: pointer;
  box-shadow: var(--box-shadow);
  transition: all 0.3s ease;
}
</style>