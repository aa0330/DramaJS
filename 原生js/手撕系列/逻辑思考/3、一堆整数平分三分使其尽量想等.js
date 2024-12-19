// 一堆整数平分三分使其尽量想等
/**
 *  思路一：
 *        求和除与3使其尽可能
 *
 *
 */

let temNums = [11, 42, 23, 4, 5, 6, 4, 5, 6, 11, 23, 42, 56, 78, 90];

function bisection(nums) {
  let objNum = [
    { sum: 0, numArr: [] },
    { sum: 0, numArr: [] },
    { sum: 0, numArr: [] },
  ];
  let newArr = [...nums].sort((a, b) => a - b);
  for (let num of newArr) {
    let minArr = objNum.sort((a, b) => a.sum - b.sum)[0];
    minArr.numArr.push(num);
    minArr.sum += num;
  }
  return [objNum[0].numArr, objNum[1].numArr, objNum[2].numArr];
}

console.time("start");
console.log(bisection(temNums));
console.timeEnd("start");

for (let item of bisection(temNums)) {
  console.log(item.reduce((p, c) => p + c, 0));
}
