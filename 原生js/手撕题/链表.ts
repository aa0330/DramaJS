interface INode {
    element: number;
    next: object;
}

class TNode implements INode {
    public element: number;
    public next: object;
    constructor(ele: number, next: object) {
        this.element = ele;
        this.next = next;
    }
}

class LinkList {
    public head;
    public size;
    constructor() {
        this.head = null;
        this.size = 0;
    }
    getNode(index: number): TNode {
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }
    add(index: number, ele?: number): void {
        if (index > this.size || index < 0) throw new Error('创建索引失败')
        if (arguments.length === 1) {
            ele = index;
            index = this.size
        }
        if (index == 0) {
            let head = this.head;
            this.head = new TNode((ele as number), head);
        } else {
            let prvNode = this.getNode(index - 1);
            prvNode.next = new TNode((ele as number), prvNode.next);
        }
        this.size++;
    }
}

let ll = new LinkList();

ll.add(0, 1)
console.log(ll.size);







