/**
 *
 *  路由表、动态路由、路由守卫、路由传参
 *
 *  路由表：
 *      constructor传入路由数据进行初始化 或者  写个init函数
 *
 *  动态路由：
 *      动态的增加或者删除路由
 *
 *  路由守卫：
 *      前置路由守卫：真正的代码逻辑执行前调用，
 *      后置路由守卫：逻辑代码执行之后进行调用
 *
 *
 *  路由传参：
 *      借助第三方库或者自己截取+匹配参数
 */

class HashRouter {
  constructor() {
    this.routes = {};
    this.beforEach = null;
    this.afterEach = null;
    this.prevPath = "";
    this.passNot = false;
    window.addEventListener("hashchange", this.load.bind(this), false);
  }

  initRoutes(routeObj) {
    if (typeof routeObj !== "object" || routeObj === null) return;
    this.routes = routeObj;
  }

  addRoute(path, fn) {
    if (typeof path === "string" && typeof fn === "function") {
      this.routes[path] = fn;
    }
  }

  removeRoute(path) {
    if (typeof path !== "string") return;
    delete this.routes[path];
  }

  addBeforEach(fn) {
    if (typeof fn !== "function") return;
    let routerList = Object.keys(this.routes);
    this.beforEach = (oldHash, newHash) => {
      const res = fn(oldHash, newHash, routerList);
      console.log("路由前置守卫跳转", res ? "通过✅" : "不通过❌");
      return res;
    };
  }

  addAfterEach(fn) {
    if (typeof fn !== "function") return;
    this.afterEach = (oldHash, newHash) => {
      fn(oldHash, newHash);
    };
  }

  load(HashChangeEvent) {
    // 前置守卫
    if (this.passNot) {
      this.passNot = false;
      return;
    }
    const oldHash = HashChangeEvent.oldURL?.split("#")[1];
    const newHash = HashChangeEvent.newURL?.split("#")[1];
    if (this.beforEach) {
      const isPass = this.beforEach(oldHash, newHash) === false ? false : true;
      if (!isPass) {
        this.passNot = true;
        this.prevPath = oldHash;
        location.hash = oldHash;
        return;
      }
    }

    // 路由 处理逻辑
    if (this.routes[newHash]) {
      // 此处可以多增加一些
      this.routes[newHash]();
    } else {
      console.log("没有找到路由🙅---404");
    }

    // 后置守卫
    if (this.afterEach) {
      this.afterEach(oldHash, newHash);
    }
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

// 路由前置守卫
router.addBeforEach((from, to, routerList) => {
  if (to === "mine") return false;
  return true;
});

//路由后置守卫
router.addAfterEach((from, to) => {
  if (to == "test") {
    document.title = "测试 Hash模式";
  } else {
    document.title = "HashRouter";
  }
});

// router.addRoute("aaa", () => {
//   console.log("aaa添加成功");
// });

// router.removeRoute('aaa')
