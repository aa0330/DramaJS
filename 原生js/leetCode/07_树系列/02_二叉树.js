/**
 * 二叉树:
 *      好像只有搜索二叉树才有意义，普通的二叉树该如何整
 * 
 */

class Node {
    constructor(value) {
        this.value = value;
        this.left = this.right = null;
    }

}
class createTree {
    constructor(val) {
        this.root = new Node(val);
        this.curNode = this.root;
        this.size = 1;
    }
    insertLeftNode(val) {
        this.curNode.left = new Node(val)
    }
    insertLeftNode(val) {
        this.curNode.right = new Node(val)
    }

}

