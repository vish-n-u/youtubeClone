class Node {
  constructor(data) {
    this.next = null;
    this.prev = null;
    this.data = data;
  }
}

class LRU {
  constructor(length) {
    this.maxLength = length;
    this.length = 0;
    this.lruObj = {};
    this.head = null;
    this.tail = null;
  }

  add(key, value) {
    if (this.length == 0) {
      this.head = new Node(value);
      this.tail = this.head;
      this.length++;
      this.lruObj[key] = this.head;
      return;
    }
    if (this.length == this.maxLength && !this.lruObj[key]) {
      this.head = this.head.next;
      this.head.prev = null;
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
    this.tail.next = new Node(value);
    this.tail.next.prev = this.tail;
    this.tail = this.tail.next;
    this.lruObj[key] = this.tail;
    this.length++;
  }
  showData() {
    let currData = this.head;
    while (currData != null) {
      console.log(currData.data);
      currData = currData.next;
    }
  }
}

const lru = new LRU(5);

let x = "alpha";

function add(key, value) {
  let obj = {};
  obj[key] = value;
  console.log(obj);
}

add([x], [1, 2, 3]);
