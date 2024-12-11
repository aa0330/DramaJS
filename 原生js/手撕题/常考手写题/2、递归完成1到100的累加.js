function sumAdd(prv, cur) {
  if (cur === 100) {
    return prv + cur;
  } else {
    return sumAdd(Number(prv + cur), Number(cur + 1));
  }
}
console.log(sumAdd(0, 1));
