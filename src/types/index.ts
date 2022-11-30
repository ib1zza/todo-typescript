export type Todo = {
  _id: string;
  title: string;
  description?: string;
  priority: number;
  status: boolean;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
};

export type TodoCompleted = Todo & {
  dateOfCompletion?: string;
};
