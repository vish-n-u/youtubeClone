class Node {
  constructor(data) {
    this.next = null;
    this.prev = null;
    this.data = data;
  }
}

let initialState = {
  lruObj: {
    length: 0,
    maxLength: 5,
    head: null,
    tail: null,
    add: function (key, value) {
      if (this.length == 0) {
        this.head = new Node(value);
        console.log(this.head);
        this.tail = this.head;
        this.length++;
        initialState.lruObj[key] = this.head;
        return;
      }
      if (this.length == this.maxLength && !initialState.lruObj[key]) {
        this.head = this.head.next;
        this.head.prev = null;
        this.length--;
      }
      if (initialState.lruObj[key]) {
        if (this.length == 1) return;
        if (initialState.lruObj[key] == this.head) {
          this.head = this.head.next;
          this.head.prev = null;
          this.length--;
        } else if (initialState.lruObj[key] == this.tail) {
          return;
        } else {
          initialState.lruObj[key].prev.next = initialState.lruObj[key].next;
          initialState.lruObj[key].next.prev = initialState.lruObj[key].prev;
          this.length--;
        }
      }
      this.tail.next = new Node(value);
      this.tail.next.prev = this.tail;
      this.tail = this.tail.next;
      initialState.lruObj[key] = this.tail;
      this.length++;
    },
  },
};

initialState.lruObj.add("netflix", { netflix: [1, 2, 3, 4] });
let datas = "netflix";
console.log(initialState.lruObj[datas].data[datas]);
