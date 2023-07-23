<script setup lang="ts">
import { ref } from "vue"
import UserForm from './UserForm.vue';
import { useUsers } from "../stores/users";
import { NewUser } from '../interfaces';
import { useRouter } from "vue-router";

const router = useRouter();
const usersStore = useUsers();
let error = ref("");

const handleSubmit = async (newUser: NewUser) => {
  try {
    const res = await usersStore.createUser(newUser);
    if (res?.error) {
      return error.value = "user already found";
    }
    return router.push("/tasks")
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <UserForm cta="Sign Up" :error="error" @submit="handleSubmit" />
</template>