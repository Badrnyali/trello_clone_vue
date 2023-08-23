import { defineStore } from "pinia";
import { toRaw } from "vue";
import { Board, Tasks } from "../interfaces";
import { v4 as uuidv4 } from "uuid";
import { useUsers } from "./users";
import { Priority } from "../constants/constant";

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
          priority: task.priority,
          score: task.score,
        });

        this.boardsList.filter((board: Board) => {
          if (board.id === task.id) {
            if (task.priority === Priority.High) {
              return board.tasks.splice(0, 0, taskId);
            }
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
          task.priority = newTask.priority;
          task.score = newTask.score;
          return;
        }
      });
      await this.postBoardTask();
    },
    async updateBoard(cardIndex?: number, taskIds?: string[]) {
      await this.postBoardTask();
    },
    cloneTask(taskId: string) {
      const newId = uuidv4();
      this.tasksList.forEach((taskList: Tasks) => {
        if (taskList.id === taskId) {
          const clonedTask = structuredClone(toRaw(taskList));
          this.tasksList.push({
            ...clonedTask,
            id: newId,
          });
        }
      });
      return newId;
    },
    async duplicateBoard(board: Board) {
      const { title, id, userId, tasks } = board;
      const index = this.boardsList.findIndex((board) => board.id === id);
      let tasksId: string[] = [];
      if (board.tasks.length) {
        board.tasks.forEach((task) => {
          const newId = this.cloneTask(task);
          tasksId.push(newId);
        });
      }
      this.boardsList.splice(index, 0, {
        title,
        id: uuidv4(),
        userId,
        tasks: tasksId,
      });
      await this.postBoardTask();
    },
    async duplicateTask(taskId: string, boardId: string) {
      const board = this.boardsList.find((board) => board.id === boardId);
      const index = board?.tasks.findIndex((task) => task === taskId)!;
      const newId = this.cloneTask(taskId);
      board?.tasks.splice(index, 0, newId);
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
