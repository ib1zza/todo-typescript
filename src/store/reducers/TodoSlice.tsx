import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
  id: string;
  title: string;
  description?: string;
  dateOfCreation: string;
  isCompleted?: boolean;
};

type TodoState = {
  list: Array<Todo>;
};

const initialState: TodoState = {
  list: [
    {
      id: "1",
      title: "asd",
      description: "asdasd1",
      dateOfCreation: new Date().toISOString(),
    },
  ],
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
    filterTodo: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "dateOfCreation":
          state.list.sort(
            (a, b) =>
              Date.parse(b.dateOfCreation) - Date.parse(a.dateOfCreation)
          );
          console.log("filtered by date");
          return;
        case "title":
          state.list.sort((a, b) =>
            a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1
          );
          console.log("filtered by title");
          return;
      }
    },
  },
});

export const { createTodo, deleteTodo, completeTodo, filterTodo } =
  TodoSlice.actions;
export default TodoSlice.reducer;
