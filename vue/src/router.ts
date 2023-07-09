import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/HomeView.vue";
import taskBoardVue from "./views/taskBoard.vue";
import { useUsers } from "./stores/users";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      name: "Start",
    },
    {
      path: "/tasks",
      component: taskBoardVue,
      name: "Tasks",
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const currentUser = useUsers().currentUserId;
  if (to.path === "/tasks" && !currentUser) {
    router.push({ name: "Start" });
  } else if (to.path === "/" && currentUser) {
    router.push({ name: "Tasks" });
  } else {
    next();
  }
});
