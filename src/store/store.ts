import { combineReducers, configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./reducers/TodoSlice";
import TodoCompletedSlice from "./reducers/TodoCompletedSlice";

const store = configureStore({
  reducer: { todo: TodoSlice, todoCompleted: TodoCompletedSlice },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
