import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { PORT } from "../../BackConfig";

interface RegistrationState {
  isSuccessFull: boolean;
  email: string;
  _id: string;
  loading: boolean;
  error: string | null;
}

const initialState: RegistrationState = {
  isSuccessFull: true,
  email: "",
  _id: "",
  loading: false,
  error: null,
};

interface fetchRegistrationProps {
  email: string;
  password: string;
}

interface fetchRegistrationAns {
  email: string;
  note: [];
  _id: string;
  __v: number;
}

export const fetchRegistration = createAsyncThunk<
  fetchRegistrationAns,
  fetchRegistrationProps,
  { rejectValue: string }
>(
  "todo/fetchRegistration",
  async function ({ email, password }, { rejectWithValue }) {
    const response = await axios
      .post<fetchRegistrationAns>(`http://localhost:${PORT}/registration`, {
        email,
        password,
      })
      .then((res) => res.data)
      .catch(function (error: AxiosError) {
        console.log(error.toJSON());
        return rejectWithValue(error.message);
      });

    return response;
  }
);

const RegistrationSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistration.pending, (state) => {
        state.email = "";
        state.loading = true;
        state.error = null;
        state.isSuccessFull = true;
      })
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state._id = action.payload._id;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        console.log("Login Error:" + action.payload);
        state.error = action.payload;
        state.loading = false;
        state.isSuccessFull = false;
      });
  },
});

const isError = (action: AnyAction) => {
  return action.type.endsWith("rejected");
};

// export const {} = LoginSlice.actions;
export default RegistrationSlice.reducer;
