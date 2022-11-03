import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
  id: string;
  title: string;
  description?: string;
  priority: number;
  dateOfCreation: string;
  isCompleted?: boolean;
  dateOfCompletion?: string;
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
  completedList: [
    {
      id: "100",
      title: "completed task",
      description: "comp1",
      priority: 4,
      dateOfCreation: new Date("2022-10-31T14:35:45.051Z").toISOString(),
      dateOfCompletion: new Date(Date.now()).toISOString(),
    },
  ],
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
    deleteCompletedTodo: (state, action: PayloadAction<string>) => {
      state.completedList = state.completedList.filter(
        (el) => el.id !== action.payload
      );
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      const el = state.list.find((el) => el.id === action.payload);

      if (el !== undefined) {
        el.dateOfCompletion = new Date(Date.now()).toISOString();
        state.completedList.push(el);
      }
      state.list = state.list.filter((el) => el.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const edited = action.payload;
      const elIndex = state.list.findIndex((el) => el.id === action.payload.id);
      state.list[elIndex] = edited;
    },
    filterTodo: (state, action: PayloadAction<string>) => {
      state.currentSort =
        action.payload === "current" ? state.currentSort : action.payload;

      switch (state.currentSort) {
        case "dateOfCreation":
          state.list.sort(
            (a, b) =>
              Date.parse(b.dateOfCreation) - Date.parse(a.dateOfCreation)
          );
          console.log("filtered by date");
          return;

        case "dateOfCreation_reverse":
          state.list.sort(
            (a, b) =>
              Date.parse(a.dateOfCreation) - Date.parse(b.dateOfCreation)
          );
          console.log("filtered by date reversed");
          return;
        case "title":
          state.list.sort((a, b) =>
            a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
          );
          console.log("filtered by title");
          return;
        case "priority":
          state.list.sort((a, b) => a.priority - b.priority);
          return;
      }
    },
  },
});

export const {
  createTodo,
  deleteTodo,
  completeTodo,
  filterTodo,
  editTodo,
  deleteCompletedTodo,
} = TodoSlice.actions;
export default TodoSlice.reducer;
