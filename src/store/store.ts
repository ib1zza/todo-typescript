import { combineReducers, configureStore } from "@reduxjs/toolkit";

import TodoSlice from "./reducers/TodoSlice";
import LoginSlice from "./reducers/LoginSlice";
import RegistrationSlice from "./reducers/RegistrationSlice";

const rootReducer = combineReducers({
  todo: TodoSlice,
  login: LoginSlice,
  register: RegistrationSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
