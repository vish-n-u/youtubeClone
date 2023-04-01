import { createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";

const hamburgerToggle = createSlice({
  name: "toggle",
  initialState: {
    isToggleOpen: true,
  },
  reducers: {
    changeToggleState: (state) => {
      state.isToggleOpen = !state.isToggleOpen;
    },
    collapseToggle: (state) => {
      if (state.isToggleOpen == true) state.isToggleOpen = false;
    },
  },
});

export const { changeToggleState, collapseToggle } = hamburgerToggle.actions;

export default hamburgerToggle.reducer;
