import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { deliveredTask, Task } from "../models";

export interface TasksState {
    myTasks: Task[],
    deliveredTasks: Task[],
    loading: boolean,
    error: string | void | null,
}

const initialState: TasksState = {
    myTasks: [],
    deliveredTasks: [],
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
      } else {
          console.log("No such document!");
          return rejectWithValue("No such document!");
      }
  }
);

export const fetchDeliveredTasks = createAsyncThunk<Task[], string, { rejectValue : string }>(
  'tasks/fetchDeliveredTasks',
  async (userId, { rejectWithValue }) => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          return docSnap.data().deliveredTasks as Task[];
      } else {
          console.log("No such document!");
          return rejectWithValue("No such document!");
      }
  }
);

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        putNewMyTasks(state, action) {
            state.myTasks = action.payload.newTasks;
},
        putNewDeliveredTasks(state, action) {
            state.deliveredTasks = action.payload.newTasks;
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
          .addCase(fetchDeliveredTasks.pending, (state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase(fetchDeliveredTasks.fulfilled, (state, action) => {
              state.loading = false;
              state.deliveredTasks = action.payload;
          })
          .addCase(fetchDeliveredTasks.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
          })
    }
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice.reducer;