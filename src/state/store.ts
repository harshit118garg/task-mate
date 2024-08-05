import { create } from "zustand";
import { TaskMateState, TaskMateActions, Task } from "../definations/types";

export const useTaskMateStore = create<TaskMateState & TaskMateActions>(
  (set) => ({
    tasks: [],

    addTask: (task: Task) => {
      set((state) => ({
        tasks: [...state.tasks, task],
      }));
    },

    removeTask: (index: number) => {
      set((state) => ({
        tasks: state.tasks.filter((_, i) => i !== index),
      }));
    },

    updateTask: (index: number, updatedTask: Task) => {
      set((state) => ({
        tasks: state.tasks.map((task, i) => (i === index ? updatedTask : task)),
      }));
    },
  })
);
