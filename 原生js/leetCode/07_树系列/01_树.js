//  [1,-1]
// [1,2,3,4,-1,-1,31,32,41,-1]
//  [1,2,2,3,4,-1,4]

class Node {
    constructor(val) {
        this.value = val
        this.childs = []
    }
}

class Tree {
    constructor(...values) {
        if (!values) return;
        this.root = new Node(values[0]);
        this.size = values.length;
        this.tierArr = [1];
        let [first, ...resArr] = values;
        this.initTree(resArr);
    }
    initTree(valuesArr) {
        let curNdoe = this.root;
        for (let val of valuesArr) {
            if (val != -1) {
                let newNode = new Node(val);
                curNdoe.childs.push(newNode);
                this.size++;
            } else {
                this.tierArr.push(++this.tierArr[this.tierArr.length - 1])

            }
        }
    }

    addNode(location, value) {
        let locaArr = location.split('-')
    }
}
let tree = new Tree(1, 3, 4, 5, -1)
console.log(tree);

