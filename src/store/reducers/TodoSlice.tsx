import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
  id: string;
  title: string;
  description?: string;
  priority?: number;
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
    },
    {
      id: "2",
      title: "zxc",
      description: "zxzxc2",
      dateOfCreation: new Date("2022-10-31T14:35:45.051Z").toISOString(),
    },
  ],
  completedList: [
    {
      id: "100",
      title: "completed task",
      description: "comp1",
      dateOfCreation: new Date("2022-10-31T14:35:45.051Z").toISOString(),
      dateOfCompletion: Date.now().toString(),
    },
  ],
  currentSort: "title",
};
const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo: (state, action: PayloadAction<Todo>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        dateOfCreation: action.payload.dateOfCreation,
        isCompleted: false,
      };
      state.list.push(newTodo);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((el) => el.id !== action.payload);
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      const elIndex = state.list.findIndex((el) => el.id === action.payload); //ищем ИНДЕКС элемента, у которого хотим изменить комплитед
      if (elIndex > -1) {
        state.list[elIndex].isCompleted = true;
      } //если нашелся элемент с таким id, то ставим ему комплитед тру
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const edited = action.payload;
      const elIndex = state.list.findIndex((el) => el.id === action.payload.id);
      state.list[elIndex] = edited;
    },
    filterTodo: (state, action: PayloadAction<string>) => {
      switch (
        action.payload === "current" ? state.currentSort : action.payload
      ) {
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
      }
    },
  },
});

export const { createTodo, deleteTodo, completeTodo, filterTodo, editTodo } =
  TodoSlice.actions;
export default TodoSlice.reducer;
