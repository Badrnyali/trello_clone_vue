<script setup lang="ts">
import { ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core'


const props = defineProps<{
  closeDots?: boolean
}>()
const emits = defineEmits(["close-dots"])
const taskMenu = ref();

const toggleHandler = () => {
  const taskMenus = document.querySelectorAll(".task__menu")
  if (taskMenus.length) {
    taskMenus.forEach(task => {
      if (taskMenu.value === task) {
        if (!task.classList.contains('active')) {
          task.classList.add('active')
        } else {
          task.classList.remove('active')
        }
      }
      if (taskMenu.value !== task && task.classList.contains('active')) {
        task.classList.remove('active')
      }
    })
  }
}
const closeMenu = ()=> {
  const taskMenus = document.querySelectorAll(".task__menu")
  taskMenus.forEach(task => {
      task.classList.remove("active")
    })
}
watch(() => props.closeDots, () => {
  if (props.closeDots) {
    closeMenu()
    emits("close-dots")
  }
})

onClickOutside(taskMenu, closeMenu)
</script>
<template>
  <div>
    <button class="no-styles three__dots" @click.stop="toggleHandler">
      <span class="dot">.</span>
      <span class="dot">.</span>
      <span class="dot">.</span>
    </button>
    <div ref="taskMenu" class="task__menu">
      <div class="task__menu-title">
        <p>Action List</p>
        <a @click.stop="closeMenu">X</a>
      </div>
      <ul>
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<style>
.three__dots {
  position: relative;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  justify-content: center;
  padding: 5px;
  border-radius: 4px;
  transition: 0.3s all ease;
}

.three__dots:hover {
  background-color: var(--light-blue);
}

span {
  font-size: 18px;
  font-weight: bolder;
  margin-top: -6px;
  color: var(--very-dark-blue)
}

.task__menu {
  position: absolute;
  display: none;
  flex-direction: column;
  width: 200px;
  background-color: var(--very-light-blue);
  box-shadow: var(--box-shadow);
  right: -160px;
  color: var(--text-color);
  top: 35px;
  border-radius: 10px;
  padding-top: 15px;
  padding-bottom: 5px;
  transition: opacity 0.3s ease;
  z-index: 99;
}

.task__menu-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 10px;
  color: var(--very-dark-blue);
  font-weight: bold;
  font-size: 16px;
}

.task__menu-title a {
  font-size: 12px;
  padding: 3px 6px;
  font-weight: bolder;
  border-radius: 3px;
  cursor: pointer;
}

.task__menu-title a:hover {
  background-color: var(--light-blue);
}

.task__menu ul {
  margin: 0;
  padding: 0px;
}

.task__menu li {
  padding: 5px 10px;
  font-size: 14px;
  text-align: left;
  color: var(--very-dark-blue);
  cursor: pointer;
}

.task__menu li:hover {
  background-color: var(--light-blue);
}

.task__menu.active {
  display: flex;
}

.task__menu.active~.drag-container__task {
  z-index: 99;
}

span:not(:last-child) {
  margin-right: 2px;
}
</style>