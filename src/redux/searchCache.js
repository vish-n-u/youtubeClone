class Node {
  constructor(data) {
    this.next = null;
    this.prev = null;
    this.data = data;
  }
}

import { createSlice, current } from "@reduxjs/toolkit";

const searchCache = createSlice({
  name: "searchCache",
  initialState: {
    obj: {
      lruObj: {},
      length: 0,
      maxLength: 5,
      start: undefined,
      head: null,
      tail: null,
      add: function (key, value) {
        if (this.length == 0) {
          this.head = new Node({ [key]: value });
          console.log(this.head);
          this.tail = this.head;

          this.length++;
          console.log("lruObj", this.lruObj);
          this.lruObj[key] = this.head;
          return;
        }
        if (this.length == this.maxLength && !this.lruObj[key]) {
          let x = Object.keys(this.head.data);
          this.head = this.head.next;
          this.head.prev.next = null;
          this.head.prev = null;

          this.length--;
          console.log("oooo", this.lruObj[key], x[0]);
          delete this.lruObj[x[0]];
        }
        if (this.lruObj[key]) {
          if (this.length == 1) return;
          if (this.lruObj[key] == this.head) {
            this.head = this.head.next;
            this.head.prev = null;
            this.length--;
          } else if (this.lruObj[key] == this.tail) {
            return;
          } else {
            this.lruObj[key].prev.next = this.lruObj[key].next;
            this.lruObj[key].next.prev = this.lruObj[key].prev;
            this.length--;
          }
        }
        this.tail.next = new Node({ [key]: value });
        this.tail.next.prev = this.tail;
        this.tail = this.tail.next;
        this.lruObj[key] = this.tail;
        this.length++;
      },
    },
  },
  reducers: {
    addData: (state, action) => {
      let key = Object.keys(action.payload)[0];
      state.obj.add([key], action.payload[key]);
    },
  },
});

export const { addData } = searchCache.actions;

export default searchCache.reducer;
