import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoCompleted {
  id: string;
  title: string;
  description?: string;
  priority: number;
  dateOfCreation: string;
  dateOfCompletion: string;
}

interface TodoCompletedState {
  todos: Array<TodoCompleted>;
  currentSort: string;
}

const initialState: TodoCompletedState = {
  todos: [
    {
      id: "100",
      title: "completed task",
      description: "comp1",
      priority: 4,
      dateOfCreation: new Date("2022-10-31T14:35:45.051Z").toISOString(),
      dateOfCompletion: new Date(Date.now()).toISOString(),
    },
    {
      id: "101",
      title: "completed task 011",
      description: "comp2",
      priority: 1,
      dateOfCreation: new Date("2022-09-31T14:35:45.051Z").toISOString(),
      dateOfCompletion: new Date(Date.now()).toISOString(),
    },
  ],
  currentSort: "title",
};

const TodoCompletedSlice = createSlice({
  name: "completed",
  initialState,
  reducers: {
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((el) => el.id !== action.payload);
    },
    addTodo: (state, action: PayloadAction<TodoCompleted>) => {
      state.todos.push(action.payload);
    },

    filterTodo: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) state.currentSort = action.payload;
      console.log(state.currentSort);

      switch (state.currentSort) {
        case "dateOfCreation":
          state.todos.sort(
            (a, b) =>
              Date.parse(b.dateOfCreation) - Date.parse(a.dateOfCreation)
          );
          return;
        case "dateOfCreation_reverse":
          state.todos.sort(
            (a, b) =>
              Date.parse(a.dateOfCreation) - Date.parse(b.dateOfCreation)
          );
          return;
        case "dateOfCompletion":
          state.todos.sort(
            (a, b) =>
              Date.parse(b.dateOfCompletion) - Date.parse(a.dateOfCompletion)
          );
          return;
        case "dateOfCompletion_reverse":
          state.todos.sort(
            (a, b) =>
              Date.parse(a.dateOfCompletion) - Date.parse(b.dateOfCompletion)
          );
          return;
        case "title":
          state.todos.sort((a, b) =>
            a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
          );
          return;
        case "priority":
          state.todos.sort((a, b) => a.priority - b.priority);
          return;
      }
    },
  },
});

export const { addTodo, deleteTodo, filterTodo } = TodoCompletedSlice.actions;
export default TodoCompletedSlice.reducer;
