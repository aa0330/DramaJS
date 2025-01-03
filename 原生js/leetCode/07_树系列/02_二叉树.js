/**
 *
 *
 *
 */

class Node {
  constructor(value) {
    this.value = value;
    this.left = this.right = null;
  }
}

//  二叉树
class Tree {
  limit = 0;

  constructor(valArr) {
    if (!valArr) return;
    this.root = null;
    this.initTree(valArr);
  }

  initTree(valArr) {
    let temArr = [...valArr],
      quee = [];
    this.root = new Node(temArr.shift());
    quee.push(this.root);
    while (temArr.length) {
      let curNode = quee.shift();
      curNode.left = new Node(temArr.shift());
      quee.push(curNode.left);

      let isEmpty = !temArr.length;
      if (isEmpty) {
        return;
      } else {
        curNode.right = new Node(temArr.shift());
        quee.push(curNode.left);
      }
    }
  }
  getMaxDeep(root = this.root) {
    if (!root) return 0;
    return (
      Math.max(this.getMaxDeep(root.left), this.getMaxDeep(root.right)) + 1
    );
  }
}

const tree = new Tree([1, 2, 4, 5, 6]);
