import { configureStore } from "@reduxjs/toolkit";
import hamburgerToggle from "./hamburgerToggle";
import AllVids from "./allVids";
import searchCache from "./searchCache";
import queryVids from "./queryVids";

const store = configureStore({
  reducer: {
    toggle: hamburgerToggle,
    allVids: AllVids,
    searchCache: searchCache,
    queryVids: queryVids,
  },
});

export default store;
