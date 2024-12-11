/**
 * 为什么constructor要绑定this呢？
 *  new的时候 this会给实例绑定,指向实例对象，类上的方法都放在类原型上,
 *
 */

class HashRouter {
  constructor(routes) {
    this.routes = routes;

    window.addEventListener(
      "hashchange",
      () => {
        // console.log(this);
        this.load();
      },
      false
    );
  }

  load() {
    let nowHash = location.hash;
    if (!nowHash) {
      //首页情况
      // console.log("启动！！");
    }
    console.log(nowHash);
    
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
