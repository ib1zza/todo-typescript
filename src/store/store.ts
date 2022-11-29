import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import TodoSlice from "./reducers/TodoSlice";
import TodoCompletedSlice from "./reducers/TodoCompletedSlice";
import LoginSlice from "./reducers/LoginSlice";
import RegistrationSlice from "./reducers/RegistrationSlice";

const rootReducer = combineReducers({
  todo: TodoSlice,
  todoCompleted: TodoCompletedSlice,
  login: LoginSlice,
  register: RegistrationSlice,
});

// const persistConfig = {
//   key: "root",
//   storage,
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
});

export default store;

// export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
