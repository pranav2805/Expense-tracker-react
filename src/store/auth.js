import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const initialState = { token: "", isLoggedIn: !!token };

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlicer.actions;

export default authSlicer.reducer;
