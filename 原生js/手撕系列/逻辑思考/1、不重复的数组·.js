// 产生不重复的随机数组

function randomArr(size) {
  let arr = [];
  while (size--) {
    let num = Number((Math.random() * 10000).toFixed(0));
    if (!arr.includes(num)) {
      arr.push(num);
    } else {
      size++;
    }
  }
  return arr;
}

console.log(randomArr(100));
