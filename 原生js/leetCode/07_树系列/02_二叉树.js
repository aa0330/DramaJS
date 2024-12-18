// 搜索二叉树
class Node {
    constructor(value) {
        this.value = value;
        this.left = this.right = null;
    }
}

class createTree {
    constructor(...values) {
        this.root = null;
        this.size = values.length;
        for (let val of values) {
            this.inserNode(val)
        }
    }
    inserNode(val, curNode = this.root) {
        if (curNode) {
            if (curNode.value >= val) {
                if (curNode.left) {
                    this.inserNode(val, curNode.left)
                } else {
                    curNode.left = new Node(val)
                }
            } else {
                if (curNode.right) {
                    this.inserNode(val, curNode.right)
                } else {
                    curNode.right = new Node(val)
                }
            }
        } else {
            this.root = new Node(val)
        }
    }
}


let nums = [9, 5, 10, 15, 4, 3, 9, 11, 14, 15]
let tree = new createTree(8, 1, 3, 1, 9, 5, 10, 15, 4, 3, 9, 11, 14, 15)
console.log(tree);
