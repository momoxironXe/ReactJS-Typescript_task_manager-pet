import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import tasksReducer from "./tasks";

const store = configureStore({
  reducer: { auth: authReducer, tasks: tasksReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
