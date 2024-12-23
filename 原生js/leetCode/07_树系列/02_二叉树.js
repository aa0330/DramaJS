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
        this.initTree(valArr)
    }

    initTree(valArr) {
        let temArr = [...valArr], quee = [];
        this.root = new Node(temArr.shift());
        quee.push(this.root)
        while (temArr.length) {
            let curNode = quee.shift();
            curNode.left = new Node(temArr.shift());
            quee.push(curNode.left);
            
            let isEmpty = !temArr.length;
            console.log(111, isEmpty);
            if (isEmpty) {
                return;
            } else {
                curNode.right = new Node(temArr.shift())
                quee.push(curNode.left);
            }
        }
        console.log(11, this.root);
    }
    

}

const tree = new Tree([1, 2, 4,5,6])