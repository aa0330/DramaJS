/**
 *  BFS、前中后序遍历
 *
 *
 */

class Node {
  constructor(val) {
    this.value = val;
    this.left = this.right = null;
  }
}

class createTree {
  constructor(...values) {
    this.root = null;
    this.size = 0;
    this.initTree(values);
    this.list = [];
  }
  initTree(values) {
    for (let val of values) {
      this.inserNode(val);
    }
  }

  inserNode(val, curNode = this.root) {
    if (val === undefined) return;
    if (curNode) {
      if (curNode.value >= val) {
        if (curNode.left) {
          this.inserNode(val, curNode.left);
        } else {
          curNode.left = new Node(val);
        }
      } else {
        this.size++;
        if (curNode.right) {
          this.inserNode(val, curNode.right);
        } else {
          this.size++;
          curNode.right = new Node(val);
        }
      }
    } else {
      this.size++;
      this.root = new Node(val);
    }
  }
  // 前序遍历
  preOrder(curNode = this.root) {
    if (curNode === null) return;
    this.list.push(curNode.value);
    this.preOrder(curNode.left);
    this.preOrder(curNode.right);
    return this.list;
  }
  // 中序遍历
  inOrder(curNode = this.root) {
    if (!curNode) return;
    this.inOrder(curNode.left);
    this.list.push(curNode.value);
    this.inOrder(curNode.right);
    return this.list;
  }
  // 后续遍历
  endOrder(curNode = this.root) {
    if (curNode === null) return;
    this.endOrder(curNode.left);
    this.endOrder(curNode.right);
    this.list.push(curNode.value);
    return this.list;
  }

  // 层次遍历
  hierTrav() {
    if (!this.root) return;
    let quee = [],
      nodeArr = [this.root];
    while (nodeArr.length) {
      let curNode = nodeArr.shift();
      quee.push(curNode.value ?? null);
      if (curNode.left) nodeArr.push(curNode.left);
      if (curNode.right) nodeArr.push(curNode.right);
    }
    return quee;
  }
}

const tree = new createTree(9, 4, 18, 12, 8);
tree.inserNode(1);
console.log(tree);
console.log(tree.inOrder());
