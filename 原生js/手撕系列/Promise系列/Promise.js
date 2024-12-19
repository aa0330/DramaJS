class MyPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  constructor(executor) {
    this.status = MyPromise.PENDING;
    this.value = null;
    this.callbacks = [];
    executor(this.resolve.bind(this), this.reject.bind(this));
  }
  resolve(value) {
    this.status = MyPromise.FULFILLED;
    this.value = value;
    setTimeout(() => {
      this.callbacks.forEach((cb) => {
        cb.onFulfilled(this.value);
      });
    });
  }
  reject(value) {
    this.status = MyPromise.REJECTED;
    this.value = value;
    setTimeout(() => {
      this.callbacks.forEach((cb) => {
        cb.onRejected(this.value);
      });
    });
  }
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function") onFulfilled = (value) => value;
    if (typeof onRejected !== "function") onRejected = (value) => value;
    return new MyPromise((resolve, reject) => {
      if (this.status === MyPromise.PENDING) {
        this.callbacks.push({
          onFulfilled: (value) => {
            const res = onFulfilled(value);
            this.resolvePromise(res, resolve, reject);
          },
          onRejected: (value) => {
            const res = onFulfilled(value);
            this.resolvePromise(res, resolve, reject);
          },
        });
      }
      if (this.status === MyPromise.FULFILLED) {
        setTimeout(() => {
          const res = onFulfilled(this.value);
          this.resolvePromise(res, resolve, reject);
        });
      }
      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          const res = onFulfilled(this.value);
          this.resolvePromise(res, resolve, reject);
        });
      }
    });
  }

  resolvePromise(res, resolve, reject) {
    try {
      // const res = onFulfilled(value);
      if (res instanceof MyPromise) {
        res.then(resolve, reject);
      } else {
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  }
}
let promise1 = new MyPromise(() => {});
