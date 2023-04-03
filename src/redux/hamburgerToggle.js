import { createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";

const hamburgerToggle = createSlice({
  name: "toggle",
  initialState: {
    isToggleOpen: true,
  },
  reducers: {
    changeToggleState: (state) => {
      console.log("change toggle was called");
      state.isToggleOpen = !state.isToggleOpen;
    },
    collapseToggle: (state) => {
      console.log("collapse toggle was called");
      if (state.isToggleOpen == true) state.isToggleOpen = false;
    },
  },
});

export const { changeToggleState, collapseToggle } = hamburgerToggle.actions;

export default hamburgerToggle.reducer;
