import { defineStore } from "pinia";
import { Board, Tasks } from "../interfaces";
import { v4 as uuidv4 } from "uuid";
import { useUsers } from "./users";

interface BoardTasksState {
  boardsList: Board[];
  tasksList: Tasks[];
  loading: boolean;
}

export const useBoardTasks = defineStore("tasks", {
  state: (): BoardTasksState => ({
    boardsList: [],
    tasksList: [],
    loading: false,
  }),

  getters: {
    getBoardTasks: (state) => {
      return state;
    },
  },

  actions: {
    async fetchBoardsPosts() {
      this.loading = true;
      const res = await window.fetch("api/tasks");
      const data = await res.json();

      this.boardsList = data["boardsList"];
      this.tasksList = data["tasksList"];
      this.loading = false;
    },
    async postBoardTask() {
      const body = JSON.stringify({
        board: this.boardsList,
        task: this.tasksList,
      });
      await window.fetch("api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
    },

    async createBoard(title: string) {
      this.boardsList.push({
        title,
        id: uuidv4(),
        userId: useUsers().currentUserId!,
        tasks: [],
      });
      await this.postBoardTask();
    },

    async taskAdded(task: Tasks) {
      const taskId = uuidv4();
      if (task.title) {
        this.tasksList.push({
          title: task.title,
          id: taskId,
          description: task.description,
        });
        this.boardsList.filter((board: Board) => {
          if (board.id === task.id) {
            return board.tasks.push(taskId);
          }
        });
      }
      await this.postBoardTask();
    },

    async modifyTask(newTask: Tasks) {
      this.tasksList.filter((task: Tasks) => {
        if (task.id === newTask.id) {
          task.title = newTask.title;
          task.description = newTask.description;
          return;
        }
      });
      await this.postBoardTask();
    },

    async removeTask(id: string) {
      this.boardsList.forEach((board: Board) => {
        board.tasks.filter((task) => {
          if (task === id) {
            return board.tasks.splice(board.tasks.indexOf(task), 1);
          }
        });
      });
      this.tasksList.filter((task) => {
        if (task.id === id) {
          return this.tasksList.splice(this.tasksList.indexOf(task), 1);
        }
      });
      await this.postBoardTask();
    },

    async removeBoard(id: string) {
      let boardArray: Array<String> = [];
      this.boardsList.filter((board: Board) => {
        if (board.id === id) {
          boardArray = board.tasks;
          return this.boardsList.splice(this.boardsList.indexOf(board), 1);
        }
      });
      this.tasksList = this.tasksList.filter((task: Tasks) => {
        return !boardArray.includes(task.id);
      });
      await this.postBoardTask();
    },
  },
});
