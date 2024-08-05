import { useTaskMateStore } from "./store";

export const useTaskMate = () => {
  const { tasks } = useTaskMateStore((state) => ({
    tasks: state.tasks,
  }));

  return { tasks };
};

export const useTaskMateActions = () => {
  const { addTask, removeTask, updateTask } = useTaskMateStore((state) => ({
    addTask: state.addTask,
    removeTask: state.removeTask,
    updateTask: state.updateTask,
  }));

  return { addTask, removeTask, updateTask };
};
