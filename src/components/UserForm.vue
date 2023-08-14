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
    <FormInput v-model="username" type="text" name="Username" />
    <FormInput v-model="password" type="password" name="Password" />
    <p v-if="error">{{ error }}</p>
    <button type="submit" class="submit no-styles">{{ cta }}</button>
  </form>
</template>
<style>
.form input {
  width: calc(100% - 55px) !important;
}

.form button.submit {
  background-color: var(--light-blue);
  color: var(--text-color);
  font-weight: bolder;
}
.form button.submit:hover{
  background-color: var(--very-light-blue);
  color: #000;
}

.dark .form button {
  background-color: #635fc7;
}
</style>