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

export default class Promise {
  constructor(executor) {
    // 初始状态为等待
    this.state = 'pending'

    // 成功的值
    this.value = undefined
    // 失败的原因
    this.reason = undefined
    // 成功存放的数组
    this.onResolvedCallbacks = []
    // 失败存放的数组
    this.onRejectedCallbacks = []

    // 成功
    let resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        // 储存成功的值
        this.value = value
        // 一旦resolved执行，调用成功数组的函数
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    // 失败
    let reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    // 如果executor执行报错，直接执行reject
    try {
      executor(resolve, reject)
    } catch(err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value)
    }
    if (this.state === 'rejected') {
      onRejected(this.reason)
    }
    if (this.state === 'pending') {
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }

}