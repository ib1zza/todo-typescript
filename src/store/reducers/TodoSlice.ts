import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { PORT } from "../../BackConfig";
import { Todo } from "../../types";

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
    .get<Todo[]>(`http://localhost:${PORT}/getnotes`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("token"),
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
  console.log(query);
  const response = await axios
    .get<Todo[]>(`http://localhost:${PORT}/getnotes?sort=${query}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("token"),
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
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: {
          title: title,
          description: description,
          priority: priority.toString(),
        },
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
  string,
  string,
  { rejectValue: string }
>("todo/FetchDeleteTodo", async function (id, { rejectWithValue }) {
  const response = await axios
    .delete<string>(`http://localhost:${PORT}/delete/${id}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => res.data)
    .then((data) => {
      // @ts-ignore
      if (data.status === 200) {
        return id;
      }
    })
    .catch(function (error: AxiosError) {
      console.log(error.toJSON());
      return rejectWithValue(error.message);
    });
  return id;
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
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: {
          title: title,
          description: description,
          priority: priority.toString(),
        },
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
        console.log("todosFetched");
        state.loading = false;
      })
      .addCase(createTodoFetch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTodoFetch.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.loading = false;
      })
      .addCase(FetchDeleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchDeleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((el) => el._id !== action.payload);
        state.loading = false;
      })
      .addCase(FetchUpdateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchUpdateTodo.fulfilled, (state, action) => {
        const ind = state.list.findIndex((el) => el._id === action.payload._id);
        state.list[ind] = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        console.log("Error:" + action.payload);
        state.error = action.payload;
        state.loading = false;
      });
  },
});

const isError = (action: AnyAction) => {
  return action.type.endsWith("rejected");
};

export const {
  createTodo,
  deleteTodo,
  completeTodo,
  editTodo,
  setCurrentSort,
} = TodoSlice.actions;
export default TodoSlice.reducer;
