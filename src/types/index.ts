export type Todo = {
  id: string;
  title: string;
  description?: string;
  priority: number;
  dateOfCreation: string;
  isCompleted?: boolean;
  dateOfCompletion?: string;
};

export type TodoCompleted = {
  id: string;
  title: string;
  description?: string;
  priority: number;
  dateOfCreation: string;
  dateOfCompletion: string;
};
