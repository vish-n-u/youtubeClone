import { createSlice, current } from "@reduxjs/toolkit";

const AllVids = createSlice({
  name: "allVids",
  initialState: {
    item: {},
  },
  reducers: {
    addVids: (state, action) => {
      let objs = {};

      let items = action.payload.map((vid) => {
        console.log(vid);
        let obj = {};
        obj[vid.id] = vid;
        objs[vid.id] = vid;
        return obj;
      });

      state.item = { ...objs };
    },
    addSingleVid: (state, action) => {
      let key = Object.keys(action.payload);
      state.item[key[0]] = { ...action.payload[key] };
    },
  },
});

export const { addVids, addSingleVid } = AllVids.actions;
export default AllVids.reducer;
