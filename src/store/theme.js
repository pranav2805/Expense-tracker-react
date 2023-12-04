import { createSlice } from "@reduxjs/toolkit";

const initialState = { isDarkTheme: false };

const themeSlicer = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle(state, action) {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const themeActions = themeSlicer.actions;

export default themeSlicer.reducer;
