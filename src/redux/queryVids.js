import { createSlice, current } from "@reduxjs/toolkit";

const QueryVids = createSlice({
  name: "queryVids",
  initialState: {
    item: {},
  },
  reducers: {
    addQueryVids: (state, action) => {
      let objs = {};

      action.payload.items.map((vid) => {
        objs[vid.id.videoId] = vid;
      });

      state.item[action.payload.key] = { ...objs };
    },
  },
});

export const { addQueryVids } = QueryVids.actions;
export default QueryVids.reducer;
