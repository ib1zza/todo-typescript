import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoCompleted } from "../../types";

interface TodoCompletedState {
  todos: Array<TodoCompleted>;
  currentSort: string;
}

const initialState: TodoCompletedState = {
  todos: [],
  currentSort: "title",
};

const TodoCompletedSlice = createSlice({
  name: "completed",
  initialState,
  reducers: {
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((el) => el._id !== action.payload);
    },
    addTodo: (state, action: PayloadAction<TodoCompleted>) => {
      state.todos.push(action.payload);
    },

    filterTodo: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) state.currentSort = action.payload;

      switch (state.currentSort) {
        case "dateOfCreation":
          state.todos.sort(
            (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
          );
          return;
        case "dateOfCreation_reverse":
          state.todos.sort(
            (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
          );
          return;
        case "dateOfCompletion":
          state.todos.sort(
            (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
          );
          return;
        case "dateOfCompletion_reverse":
          state.todos.sort(
            (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
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
