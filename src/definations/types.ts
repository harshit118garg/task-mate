export interface Task {
  title: string;
  description: string;
  priority: "p1" | "p2" | "p3" | "";
}

export interface TaskMateState {
  tasks: Task[];
}

export interface TaskMateActions {
  addTask: (task: Task) => void;
  removeTask: (index: number) => void;
  updateTask: (index: number, updatedTask: Task) => void;
}
