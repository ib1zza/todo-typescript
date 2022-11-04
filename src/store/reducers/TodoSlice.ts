import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
  id: string;
  title: string;
  description?: string;
  priority: number;
  dateOfCreation: string;
};

type TodoState = {
  list: Array<Todo>;
  completedList: Array<Todo>;
  currentSort: string;
};

const initialState: TodoState = {
  list: [
    {
      id: "1",
      title: "asd",
      description: "asdasd1",
      dateOfCreation: new Date().toISOString(),
      priority: 4,
    },
    {
      id: "2",
      title: "zxc",
      description: "zxzxc2",
      dateOfCreation: new Date("2022-10-31T14:35:45.051Z").toISOString(),
      priority: 2,
    },
  ],
  completedList: [],
  currentSort: "title",
};
const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo: (state, action: PayloadAction<Todo>) => {
      state.list.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((el) => el.id !== action.payload);
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((el) => el.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const edited = action.payload;
      const elIndex = state.list.findIndex((el) => el.id === action.payload.id);
      state.list[elIndex] = edited;
    },
    filterTodo: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) state.currentSort = action.payload;

      switch (state.currentSort) {
        case "dateOfCreation":
          state.list.sort(
            (a, b) =>
              Date.parse(b.dateOfCreation) - Date.parse(a.dateOfCreation)
          );
          return;
        case "dateOfCreation_reverse":
          state.list.sort(
            (a, b) =>
              Date.parse(a.dateOfCreation) - Date.parse(b.dateOfCreation)
          );
          return;
        case "title":
          state.list.sort((a, b) =>
            a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
          );
          return;
        case "priority":
          state.list.sort((a, b) => a.priority - b.priority);
          return;
      }
    },
  },
});

export const { createTodo, deleteTodo, completeTodo, filterTodo, editTodo } =
  TodoSlice.actions;
export default TodoSlice.reducer;
