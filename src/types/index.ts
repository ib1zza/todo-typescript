export type Todo = {
  _id: string;
  title: string;
  description?: string;
  priority: number;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
};

export type TodoCompleted = Todo & {
  dateOfCompletion?: string;
};
