class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}
class List {
  constructor() {
    this.head = null;
    this.now = null;
  }
  add(value) {
    let node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.now = node;
      return;
    }
    this.now.next = node;
    node.prev = this.now;
    this.now = node;
    console.log(this.prev, this.now);
  }
  delete(data) {
    let current = this.head;
    let previous = null;
    while (current) {
      if (current.value == data) {
        if (previous === null) {
          this.head = current.next;
          current = null;
        } else {
            
          previous.next = current.next;
          current.prev = previous;
          
        }
      }
    }
  }
}

let list = new List();
list.add(1);
list.add(2);
list.add(3);
