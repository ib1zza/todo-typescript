import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { PORT } from "../../BackConfig";
import { Todo } from "../../types/index";

type TodoState = {
  list: Array<Todo>;
  completedList: Array<Todo>;
  currentSort: string;
  loading: boolean;
  error: null | string;
};

const initialState: TodoState = {
  list: [
    {
      _id: "1",
      title: "asd",
      description: "asdasd1",
      createdAt: new Date().toISOString(),
      priority: 4,
    },
    {
      _id: "2",
      title: "zxc",
      description: "zxzxc2",
      createdAt: new Date("2022-10-31T14:35:45.051Z").toISOString(),
      priority: 2,
    },
    {
      _id: "3",
      title: "do all homework tasks",
      description: "zxzxc2",
      createdAt: new Date("2022-10-31T14:35:45.051Z").toISOString(),
      priority: 3,
    },
    {
      _id: "4",
      title: "do all homework tasks",
      description:
        "do all homework tasks do all homework tasks do all homework tasks",
      createdAt: new Date("2022-10-31T14:35:45.051Z").toISOString(),
      priority: 1,
    },
  ],
  completedList: [],
  currentSort: "title",
  loading: false,
  error: null,
};

export const fetchAllTodos = createAsyncThunk<
  Todo[] | [],
  undefined,
  { rejectValue: string }
>("todo/fetchAllTodos", async function (_, { rejectWithValue }) {
  const response = await axios
    .get<Todo[]>(`http://localhost:${PORT}/all`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res) => res.data)
    .catch(function (error: AxiosError) {
      console.log(error.toJSON());
      return rejectWithValue(error.message);
    });
  return response;
});
//sortquery - string
export const fetchSortedTodos = createAsyncThunk<
  Todo[] | [],
  string,
  { rejectValue: string }
>("todo/fetchSortedTodos", async function (query, { rejectWithValue }) {
  const response = await axios
    .get<Todo[]>(`http://localhost:${PORT}/all?sort`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      params: {
        query: query,
      },
    })
    .then((res) => res.data)
    .catch(function (error: AxiosError) {
      console.log(error.toJSON());
      return rejectWithValue(error.message);
    });
  return response;
});

interface createTodoFetchProps {
  title: string;
  description: string;
  priority: number;
}

export const createTodoFetch = createAsyncThunk<
  Todo,
  createTodoFetchProps,
  { rejectValue: string }
>(
  "todo/createTodoFetch",
  async function ({ title, description, priority }, { rejectWithValue }) {
    const response = await axios
      .post<Todo>(`http://localhost:${PORT}/create`, {
        title: title,
        description: description,
        priority: priority.toString(),
      })
      .then((res) => res.data)
      .catch(function (error: AxiosError) {
        console.log(error.toJSON());
        return rejectWithValue(error.message);
      });
    return response;
  }
);

export const FetchDeleteTodo = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string }
>("todo/FetchDeleteTodo", async function (id, { rejectWithValue }) {
  const response = await axios
    .delete<Todo>(`http://localhost:${PORT}/delete/${id}`)
    .then((res) => res.data)
    .catch(function (error: AxiosError) {
      console.log(error.toJSON());
      return rejectWithValue(error.message);
    });
  return response;
});

interface FetchUpdateTodoProps {
  id: string;
  title: string;
  description: string;
  priority: number;
}

export const FetchUpdateTodo = createAsyncThunk<
  Todo,
  FetchUpdateTodoProps,
  { rejectValue: string }
>(
  "todo/FetchUpdateTodo",
  async function ({ id, title, description, priority }, { rejectWithValue }) {
    console.log(id, title, description, priority);
    const response = await axios
      .put<Todo>(`http://localhost:${PORT}/update/${id}`, {
        title: title,
        description: description,
        priority: priority.toString(),
      })
      .then((res) => res.data)
      .catch(function (error: AxiosError) {
        console.log(error.toJSON());
        return rejectWithValue(error.message);
      });
    return response;
  }
);

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    createTodo: (state, action: PayloadAction<Todo>) => {
      state.list.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((el) => el._id !== action.payload);
    },
    completeTodo: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((el) => el._id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const edited = action.payload;
      const elIndex = state.list.findIndex(
        (el) => el._id === action.payload._id
      );
      state.list[elIndex] = edited;
    },
    setCurrentSort: (state, action: PayloadAction<string>) => {
      state.currentSort = action.payload;
    },
    // filterTodo: (state, action: PayloadAction<string | undefined>) => {
    //   if (action.payload) state.currentSort = action.payload;
    //
    //   switch (state.currentSort) {
    //     case "dateOfCreation":
    //       state.list.sort(
    //         (a, b) =>
    //           Date.parse(b.cree) - Date.parse(a.dateOfCreation)
    //       );
    //       return;
    //     case "dateOfCreation_reverse":
    //       state.list.sort(
    //         (a, b) =>
    //           Date.parse(a.dateOfCreation) - Date.parse(b.dateOfCreation)
    //       );
    //       return;
    //     case "title":
    //       state.list.sort((a, b) =>
    //         a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
    //       );
    //       return;
    //     case "priority":
    //       state.list.sort((a, b) => a.priority - b.priority);
    //       return;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTodos.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchSortedTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSortedTodos.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(createTodoFetch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTodoFetch.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(FetchDeleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchDeleteTodo.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(FetchUpdateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchUpdateTodo.fulfilled, (state, action) => {
        state.loading = false;
      });
  },
});

export const {
  createTodo,
  deleteTodo,
  completeTodo,
  editTodo,
  setCurrentSort,
} = TodoSlice.actions;
export default TodoSlice.reducer;
