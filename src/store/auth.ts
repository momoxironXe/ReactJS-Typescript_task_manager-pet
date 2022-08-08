import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Auth = {
  isLogin: boolean,
  uid: string,
  email: string,
}

const userId = localStorage.getItem("uid") || "";
const userIsLoggedIn = !!userId;
const userEmail = localStorage.getItem("email") || "";

const initialState: Auth = {
  isLogin: userIsLoggedIn,
  uid: userId,
  email: userEmail,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{uid: string, email: string}>) {
      localStorage.setItem("uid", action.payload.uid);
      localStorage.setItem("email", action.payload.email);
      state.isLogin = true;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
    },
    logout(state) {
      localStorage.removeItem("uid");
      localStorage.removeItem("email");
      state.isLogin = false;
      state.uid = "";
      state.email = "";
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;