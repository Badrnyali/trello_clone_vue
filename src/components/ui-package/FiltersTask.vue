<script setup lang="ts">
import { computed, ref } from "vue";
import { Priority } from "@/constants/constant"
import { useModal } from "@/composable/modal";
import { onClickOutside } from '@vueuse/core'


const props = withDefaults(defineProps<{
  label: string
  item: typeof Priority | string;
  items: typeof Priority | string;
  disabled: boolean;
}>(), {
  disabled: false
})

const emits = defineEmits<{
  (event: "filters-clicked", item: typeof Priority | string): void
}>()


const filtersRef = ref();
const modal = useModal();

const modalStyle = computed(() => {
  if (modal.show.value) {
    return 'show'
  }
  return 'hide'
});

const toggleModal = () => {
  if(props.disabled) return
  if (modal.show.value) {
    return modal.hideModal()
  }
  return modal.showModal()
}

const itemClicked = (item: typeof Priority) => {
  emits("filters-clicked", item)
  modal.hideModal();
}

const removePriority = () => {
  if(props.disabled) return
  emits("filters-clicked", "")
}

onClickOutside(filtersRef, ()=> {
  return modal.hideModal()
})
</script>
<template>
  <li class="filters__ul-li" ref="filtersRef" @click.self="toggleModal">
    {{ label }}
    <span v-show="item">
      <i class="fa fa-remove" @click="removePriority"></i>
      {{ item }}
    </span>
    <ul v-show="!disabled" class="filters__menu" :class="modalStyle">
    <li v-for="(item, index) in items" :key="index" class="filters__menu-item" @click="itemClicked(item)">{{ item }}
    </li>
  </ul>
  </li>
</template>
<style scoped>
.filters__ul-li {
  position: relative;
}

.filters__ul-li span {
  position: absolute;
  top: calc(100% + 3px);
  left: 5px;
  font-size: 10px;
  font-weight: bolder;
  margin-top: 2px;
}

.filters__menu {
  position: absolute;
  top: calc(100% - 5px);
  width: -webkit-fill-available;
  height: fit-content;
  background-color: var(--medium-blue);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  padding: 0;
  padding-top: 5px;
  overflow: hidden;
}

.filters__menu.show {
  display: flex;
}

.filters__menu.hide {
  display: none;
}

.filters__menu-item {
  padding: 5px 19px;
  padding-left: 5px;
  width: -webkit-fill-available;
  cursor: pointer;
}

.filters__menu-item:hover {
  background-color: var(--hover-medium-blue);
}
</style>
