import { defineStore } from "pinia";
import { NewUser } from "../interfaces";

interface UserState {
  currentUserId?: string;
}
export const useUsers = defineStore("users", {
  state: (): UserState => ({
    currentUserId: undefined,
  }),
  actions: {
    async authenticate() {
      try {
        const res = await window.fetch("/api/current-user", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();
        this.currentUserId = result.id;
      } catch (e) {
        this.currentUserId = "";
      }
    },

    async logout() {
      await window.fetch("api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await this.authenticate();
    },

    async createUser(newUser: NewUser) {
      let error = "";
      const body = JSON.stringify(newUser);
      const res = await window.fetch("api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      if ([401, 404].includes(res.status)) {
        error = "user already found";
        return { error };
      } else {
        await this.authenticate();
      }
    },
  },
});
