let arr = [1, 2, 4, 4, 6, 112, 5, 6, 1231, 56, 5, 6, 4, 1321, 4, 3, 2342, 45];

function getMax(arr) {
  let temArr = [...arr];
  temArr.sort((a, b) => a - b);
  return temArr[arr.length - 1];
}

function mathMax(arr) {
  return Math.max(...arr);
}

function forMax(arr) {
  let res = arr[0];
  for (let num of arr) {
    if (num > res) {
      res = num;
    }
  }
  return res;
}
