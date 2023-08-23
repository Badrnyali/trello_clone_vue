<script setup lang="ts">
import { ref } from "vue";
import FormInput from './FormInput.vue';
import { NewUser } from "../interfaces"
import ButtonMd from "./ui-package/ButtonMd.vue";

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
  <form class="form" @submit.prevent>
    <FormInput v-model="username" type="text" name="Username" />
    <FormInput v-model="password" type="password" name="Password" />
    <p v-if="error">{{ error }}</p>
    <ButtonMd :label="cta" @btn-click="handleSubmit" class="submit no-styles" />
  </form>
</template>
<style>
.form input {
  width: calc(100% - 55px) !important;
}
</style>