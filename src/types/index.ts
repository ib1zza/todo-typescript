export type Todo = {
  id: string;
  title: string;
  description?: string;
  priority: number;
  dateOfCreation: string;
};

export type TodoCompleted = Todo & {
  dateOfCompletion: string;
};
