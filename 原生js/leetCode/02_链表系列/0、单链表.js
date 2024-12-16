class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class List {
    constructor(value) {
        this.head = new Node(value);
        this.length = 1;
        this.curNode = this.head;
    }
    addNode(val) {
        this.curNode.next = new Node(val);
        this.curNode = this.curNode.next;
        this.length++
    }
    deleteNode(val) {
        let cur = this.head;
        let pre = null;
        while (cur) {
            if (cur.value == val) {
                if (!pre) {
                    this.head = this.head.next;

                } else {
                    pre.next = cur.next;
                }
                this.length--;
                return;
            }
            pre = cur;
            cur = cur.next;
        }
    }
    pop() {

    }
    unshift(val) {
        const newHead = new Node(val);
        this.length++
        newHead.next = this.head;
        this.head = newHead;

    }
}
const listNode = new List('a');
listNode.addNode('b')
listNode.addNode('c')
listNode.deleteNode('b')
console.log(listNode);
