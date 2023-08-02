import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router";
import "./style.css";
import App from "./App.vue";
import { useUsers } from "./stores/users";

const app = createApp(App);
app.use(createPinia());

const userStore = useUsers();
Promise.all([userStore.authenticate()]).then(() => {
  app.use(router);
  app.mount("#app");
});
