//  [1,-1]
// [1,2,3,4,-1,-1,31,32,41,-1]
//  [1,2,2,3,4,-1,4]

class Node {
    constructor(val, location) {
        this.value = val;
        this.location = location;
        this.childs = [];
    }
}

class Tree {
    constructor(...values) {
        if (!values) return;
        this.root = new Node(values[0], '1-1');
        this.size = values.length - 1;
        this.tierArr = [{ tier: 1, sernum: 1 }];
        let [first, ...resArr] = values;
        this.initTree(resArr);
    }

    initTree(valuesArr) {
        let curNdoe = this.root;
        for (let val of valuesArr) {

            if (val == -1) {        // 当前节点不再添加子节点，切换到下一个同层节点或者下一层
                let [tier, sernum] = curNdoe.location.split('-')


            } else {
                let { tier, sernum } = this.tierArr[this.tierArr.length - 1]
                let newNode = new Node(val, tier + 1 + '-' + sernum);
                this.tierArr[this.tierArr.length - 1].sernum++;
                curNdoe.childs.push(newNode);
            }
        }
    }

    addNode(location, value) {
        let locaArr = location.split('-')
    }
}
let tree = new Tree(1, 3, 4, 5, -1)
console.log(tree);

