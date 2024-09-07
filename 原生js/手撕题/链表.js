var TNode = /** @class */ (function () {
    function TNode(ele, next) {
        this.element = ele;
        this.next = next;
    }
    return TNode;
}());
var LinkList = /** @class */ (function () {
    function LinkList() {
        this.head = null;
        this.size = 0;
    }
    LinkList.prototype.getNode = function (index) {
        var current = this.head;
        for (var i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    };
    LinkList.prototype.add = function (index, ele) {
        if (index > this.size || index < 0)
            throw new Error('创建索引失败');
        if (arguments.length === 1) {
            ele = index;
            index = this.size;
        }
        if (index == 0) {
            var head = this.head;
            this.head = new TNode(ele, head);
        }
        else {
            var prvNode = this.getNode(index - 1);
            prvNode.next = new TNode(ele, prvNode.next);
        }
        this.size++;
    };
    return LinkList;
}());
var ll = new LinkList();
ll.add(0, 1);
console.log(ll.head);
