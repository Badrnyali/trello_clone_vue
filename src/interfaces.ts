import { Priority } from "./constants/constant";

export interface Board {
  title: string;
  id: string;
  userId: string;
  tasks: string[];
}

export interface Tasks {
  title: string;
  id: string;
  description: string;
  priority: typeof Priority | string;
}

export interface NewUser {
  username: string;
  password: string;
}

export interface User extends NewUser {
  id: string;
}
