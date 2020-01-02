/**
 * Promise A+ 规范
 * 1. Promise必须是三个状态中的一个：pending, fulfilled 或者
 * rejected。初始状态为pending, 可以转换为fulfilled（resolved) 或者
 * rejected，一旦状态确定，就不可以再次转换为其他状态. fulfilled状态必须
 * 返回一个确定的值，rejected状态必须返回一个确定的reason
 *
 * 2. 必须提供一个then方法以访问其当前值、终值和reason. promise接受两个
 * 可选回调函数参数onFulfilled, onRejected. 这两者不是函数会被忽略，调
 * 用次数不超过一次。
 *
 * 3. then方法返回一个新的Promise对象，支持链式调用
 *
 * 4. 不同Promise的实现可以相互调用
 */

 // ref: https://juejin.im/post/5c88e427f265da2d8d6a1c84
 // ref: https://juejin.im/post/5b2f02cd5188252b937548ab

class Promise {
  constructor(executor) {
    this.state = "pending"
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    let resolve = value => {
      if (this.state === "pending") {
        this.state = "fulfilled"
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    let reject = reason => {
      if (this.state === "pending") {
        this.state = "rejected"
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : value => value
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : err => {
            throw err
          }
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === "fulfilled") {
        // 异步
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.state === "rejected") {
        // 异步
        setTimeout(() => {
          // 如果报错
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.state === "pending") {
        this.onResolvedCallbacks.push(() => {
          // 异步
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          // 异步
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    // 返回promise，完成链式
    return promise2
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 循环引用报错
  if (x === promise2) {
    // reject报错
    return reject(new TypeError("Chaining cycle detected for promise"))
  }
  // 防止多次调用
  let called
  // x不是null 且x是对象或者函数
  if (x != null && (typeof x === "object" || typeof x === "function")) {
    try {
      // A+规定，声明then = x的then方法
      let then = x.then
      // 如果then是函数，就默认是promise了
      if (typeof then === "function") {
        // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
        then.call(
          x,
          y => {
            // 成功和失败只能调用一个
            if (called) return
            called = true
            // resolve的结果依旧是promise 那就继续解析
            resolvePromise(promise2, y, resolve, reject)
          },
          err => {
            // 成功和失败只能调用一个
            if (called) return
            called = true
            reject(err) // 失败了就失败了
          }
        )
      } else {
        resolve(x) // 直接成功即可
      }
    } catch (e) {
      // 也属于失败
      if (called) return
      called = true
      // 取then出错了那就不要在继续执行了
      reject(e)
    }
  } else {
    resolve(x)
  }
}

// adapter for promises-aplus-tests
Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
      dfd.resolve = resolve
      dfd.reject = reject
  })
  return dfd
}


module.exports = Promise