import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Task } from "../models";

export interface TasksState {
    myTasks: Task[],
    loading: boolean,
    error: string | void | null,
}

const initialState: TasksState = {
    myTasks: [],
    loading: false,
    error: null
}

export const fetchMyTasks = createAsyncThunk<Task[], string, { rejectValue : string }>(
  'tasks/fetchMyTasks',
  async (userId, { rejectWithValue }) => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          return docSnap.data().tasks as Task[];
          // return docSnap.data().tasks as Task[];
      } else {
          console.log("No such document!");
          return rejectWithValue("No such document!");
      }
  }
);

export const changeMyTaskStatus = createAsyncThunk<boolean, string>(
  'tasks/changeMyTaskStatus',
  async (userId) => {
      const currentUser = doc(db, "users", userId);
      await updateDoc(currentUser, {
          "tasks[0].status": true
      });
      return true;
  }
);

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        putNewMyTasks(state, action) {
            state.myTasks = action.payload.newTasks;
}
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchMyTasks.pending, (state) => {
              state.loading = true;
              state.error = null;
          })
        .addCase(fetchMyTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.myTasks = action.payload;
        })
          .addCase(fetchMyTasks.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
          })
          .addCase(changeMyTaskStatus.fulfilled, (state) => {

          })
    }
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice.reducer;