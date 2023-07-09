<script setup lang="ts">
import { ref } from "vue"
import UserForm from './UserForm.vue';
import { useUsers } from "../stores/users";
import { NewUser } from '../interfaces';
import { useRouter } from "vue-router";

const router = useRouter();
const usersStore = useUsers();
const error = ref('');

const handleSubmit = async (newUser: NewUser) => {
  const body = JSON.stringify(newUser);
  const res = await window.fetch("api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if ([401, 404].includes(res.status)) {
    error.value = "Username or password was not correct"
  } else {
    await usersStore.authenticate();
    router.push("/tasks")
  }
}
</script>

<template>
  <UserForm cta="Login" :error="error" @submit="handleSubmit" />
</template>