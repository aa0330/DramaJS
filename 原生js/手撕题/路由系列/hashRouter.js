/**
 * 为什么constructor要绑定this呢？
 *  new的时候 this会给实例绑定,指向实例对象，类上的方法都放在类原型上,
 *
 */

class HashRouter {
  constructor(routes) {
    this.routes = routes;

    //
    // window.addEventListener("hashchange", this.load(), false);
  }

  load() {
    let nowHash = location.hash;
    console.log("load", this);

    if (!nowHash) {
      //首页情况
      // console.log("启动！！");
    }
  }
}

const hashRouter = new HashRouter({
  "#home": () => {
    console.log("#home");
  },
  "#mine": () => {
    console.log("#mine");
  },
});
const container = document.getElementById("container");

HashRouter.prototype.load();

class Cat {
  constructor(name) {
    this.name = name
  }
  jump() {
    console.log('jump', this)
  }
  static go() {
    console.log(this)
  }
}
Cat.drink = function() {
  console.log('drink', this)
}
Cat.prototype.eat = function() {
  console.log('eat', this)
}
Cat.prototype.walk = () => {
  console.log('walk', this)
}
let cat = new Cat('豆芽')
console.log(cat);
