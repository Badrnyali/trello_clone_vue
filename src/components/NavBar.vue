<script setup lang="ts">
import ModeToggle from "../components/ui-package/ModeToggle.vue"
import { useUsers } from "../stores/users";
import { useRouter } from "vue-router";
import ButtonMd from "./ui-package/ButtonMd.vue";

const router = useRouter();
const userStore = useUsers();

const handleLogout = async () => {
  await userStore.logout();
  router.push("/")
}
</script>
<template>
  <nav class="nav">
    <ul class="nav-list">
      <li class="nav-list__bullet">Trello Clone</li>
      <div class="center">
        <ModeToggle />
        <li v-if="userStore.currentUserId" class="nav-list__bullet"><ButtonMd label="logout" bg-color="var(--white)" @btn-click="handleLogout"/></li>
      </div>
    </ul>
  </nav>
</template>

<style scoped>
.nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--very-dark-blue);
  color: var(--white);
}

.nav-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
}
</style>