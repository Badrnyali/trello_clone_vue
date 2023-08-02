<script setup lang="ts">
import { ref } from "vue";
import FormInput from './FormInput.vue';
import { NewUser } from "../interfaces"

const emit = defineEmits<{
  (event: "submit", user: NewUser): void
}>()

defineProps<{
  cta: string
  error?: string
}>()

const username = ref("");
const password = ref("");


const handleSubmit = async () => {
  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  };
  emit("submit", newUser)
}
</script>

<template>
  <form class="form" action="" @submit.prevent="handleSubmit">
    <FormInput v-model="username" type="text" name="username" />
    <FormInput v-model="password" type="password" name="password" />
    <p v-if="error">{{ error }}</p>
    <button type="submit">{{ cta }}</button>
  </form>
</template>
<style>
.form input {
  width: calc(100% - 55px) !important;
}

.form button {
  background-color: var(--light-blue);
}

.dark .form button {
  background-color: #635fc7;
  color: #fff;
}
</style>