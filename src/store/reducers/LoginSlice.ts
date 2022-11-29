import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { PORT } from "../../BackConfig";

interface LoginState {
  isLogin: boolean;
  email: string;
  token: string;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  isLogin: !!localStorage.getItem("token"),
  email: localStorage.getItem("email") || "",
  token: localStorage.getItem("token") || "",
  loading: false,
  error: null,
};

interface fetchLoginProps {
  email: string;
  password: string;
}

interface fetchLoginAns {
  token: string;
  email: string;
  notes: [any];
}

export const fetchLogin = createAsyncThunk<
  fetchLoginAns,
  fetchLoginProps,
  { rejectValue: string }
>("todo/fetchLogin", async function ({ email, password }, { rejectWithValue }) {
  const response = await axios
    .post<fetchLoginAns>(`http://localhost:${PORT}/login`, {
      email,
      password,
    })
    .then((res) => res.data)
    .catch(function (error: AxiosError) {
      console.log(error.toJSON());
      return rejectWithValue(error.message);
    });

  return response;
});

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isLogin = false;
      state.email = "";
      state.token = "";
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.email = "";
        state.isLogin = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.email = action.payload.email;
        console.log("login successful");
        state.loading = false;
        state.isLogin = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("email", action.payload.email);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        console.log("Login Error:" + action.payload);

        state.error = action.payload;
        state.loading = false;
      });
  },
});

const isError = (action: AnyAction) => {
  return action.type.endsWith("rejected");
};

export const { logOut } = LoginSlice.actions;
export default LoginSlice.reducer;
