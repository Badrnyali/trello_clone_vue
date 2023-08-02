<script setup lang="ts">
import { ref, watch } from "vue";
import { useVModel } from "@vueuse/core"

const emit = defineEmits<{
  (event: "update:show", show: boolean): void;
  (event: "confirm"): void;
}>()

const props = withDefaults(defineProps<{
  show: boolean;
  disabled?: boolean;
}>(), {
  show: false,
  disabled: false
}
)

const dialog = ref();

const isDisabled = useVModel(props, "disabled");

const dialogConfirmed = () => {
  emit("confirm");
  closeDialog();
  return;
}

const closeDialog = () => {
  dialog.value.close();
  isDisabled.value = false;
  isVisible.value = false;
  return;
}

const isVisible = useVModel(props, "show");

watch(() => isVisible.value, () => {
  if (isVisible.value) {
    dialog.value.showModal();
  }
})
</script>
<template>
  <dialog ref="dialog" class="add-board__dialog">
    <form class="add-board__form">
      <slot name="content" />
      <slot name="actions">
        <ul class="add-board__list" :class="{'disabled__list': disabled}">
          <li>
            <button value="cancel" @click="closeDialog" formmethod="dialog">Cancel</button>
          </li>
          <li v-if="!isDisabled">
            <button type="submit" value="default" @click.prevent="dialogConfirmed">Confirm</button>
          </li>
        </ul>
      </slot>
    </form>
  </dialog>
</template>
<style>
.add-board {
  position: absolute;
  bottom: 40px;
  right: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  line-height: 35px;
  height: 50px;
  width: 50px;
  background-color: var(--very-dark-blue);
  color: #fff;
  padding: 0px 0px 6px 0px;
  z-index: 99;
}
.disabled__list {
  justify-content: flex-end !important;
}
.dark .add-board {
  background-color: #fff;
  color: #000;
}

.add-board__dialog {
  border: none;
  border-radius: 10px;
}

.add-board__form {
  display: flex;
  flex-direction: column;
}

.add-board__list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
}
</style>