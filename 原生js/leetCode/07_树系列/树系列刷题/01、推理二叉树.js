/**
 * 前序： 根节点 ｜ 左子树  ｜  右子树
 * 中序： 左子树 ｜ 根节点  ｜  右子树
 *
 *  前序 --- index=0 ---》  根节点 --- 切分中序拿到左右子树长度 ---》前序找到左右子树的根节点
 *
 *
 */

const preOrderArr = [3, 9, 20, 15, 7];
const inOrderArr = [9, 3, 15, 20, 7];

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

function deduceTree(preOrder, inOrder) {
  if (!preOrder.length) return;
  if (!preOrder.length == 1) return new TreeNode(preOrder[0]);

  // 左子树中序遍历
  const inOrderLeft = inOrder.slice(0, inOrder.indexOf(preOrder[0]));

  // 右子树中序遍历
  const inOrderRight = inOrder.slice(inOrder.indexOf(preOrder[0]) + 1);

  // 左子树的前序遍历
  const preOrderLeft = preOrder.slice(1, inOrderLeft.length + 1);

  //   右子树的前序遍历
  const preOrdeRight = preOrder.slice(inOrderLeft.length + 1);

  const root = new TreeNode(
    preOrder[0],
    deduceTree(preOrderLeft, inOrderLeft) ?? null,
    deduceTree(preOrdeRight, inOrderRight) ?? null
  );
  return root;
}

console.log(deduceTree(preOrderArr, inOrderArr));
