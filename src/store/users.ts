import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../models";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export interface usersState {
    users: User[],
    error: string | undefined,
}

const initialState: usersState = {
    users: [],
    error: "",
}

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
      const arr: User[] = [];

      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
          arr.push({
              uid: doc.id,
              email: doc.data().email
          });
      });
      return arr;
  }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
          .addCase(fetchUsers.fulfilled, (state, action) => {
              state.users = action.payload;
          })
    }
})

export const usersActions = usersSlice.actions;

export default usersSlice.reducer;