/**
 *
 *  路由表、动态路由、路由守卫、路由传参
 *
 *  路由表：
 *      constructor传入路由数据进行初始化 或者  写个init函数
 *
 *  动态路由：
 *      增加或者删除路由表
 *
 *  路由守卫：
 *      前置路由守卫：真正的代码逻辑执行前调用，
 *      后置路由守卫：逻辑代码执行之后进行调用
 *
 *  路由传参：
 *      借助第三方库或者自己截取+匹配参数
 *
 *
 */

class HashRouter {
  constructor() {
    this.routes = {};
    this.beforEacf = null;
    this.prevPath = "";
    this.passNot = false;
    window.addEventListener("hashchange", this.load.bind(this), false);
  }

  initRoutes(routeObj) {
    if (typeof routeObj !== "object" || routeObj === null) return;
    this.routes = routeObj;
  }

  addRoute(hash = "", fn = () => {}) {
    if (typeof path !== "string" || typeof fn !== "function") return;
    this.routes[hash] = fn;
  }

  removeRoute(path) {
    if (typeof path !== "string") return;
    delete this.routes[path];
  }

  addBeforEach(fn) {
    if (typeof fn !== "function") return;
    this.beforEacf = (oldHash, newHash) => {
      const res = fn(oldHash, newHash);
      console.log("路由前置守卫跳转", res ? "通过✅" : "不通过❌");
      return res;
    };
  }

  load(HashChangeEvent) {
    // 前置守卫
    if (this.passNot) {
      this.passNot = false;
      return;
    }
    if (this.beforEacf) {
      const oldHash = HashChangeEvent.oldURL?.split("#")[1];
      const newHash = HashChangeEvent.newURL?.split("#")[1];
      const isPass = this.beforEacf(oldHash, newHash) === false ? false : true;
      if (!isPass) {
        this.passNot = true;
        this.prevPath = oldHash;
        location.hash = oldHash;
      }
    }

    // 路由 处理逻辑
    let 


    // 后置守卫

    
  }
}

let router = new HashRouter();

router.initRoutes({
  home: () => {
    console.log("home");
  },
  mine: () => {
    console.log("mine");
  },
  test: () => {
    console.log("test");
  },
});

router.addBeforEach((from, to) => {
  if (to === "mine") return false;
  return true;
});
