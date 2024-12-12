var name  = "THIS"
function testFun() {
  var name = "hello this!";
  console.log(this.name);
}
testFun();

console.log(global === this);
