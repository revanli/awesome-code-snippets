/**
 * bind函数思路
 * 第一步：MDN定义： bind() 方法会创建一个函数，当这个新函数被调用时，第一
 * 个参数作为它运行时的 this, 而其他参数作为新函数的参数，供调用时使用
 * 第二步：返回的绑定函数可以做为构造函数使用，之前传入的第一个 this 参数失
 * 效，提供的参数作为新函数的参数
 */

export default function (...bindArgs) {
  // 调用 bind 函数本身
  const self = this
  // 传进来的 this 对象
  let context = bindArgs.shift()

  if (context == null) {
    context = window
  } else {
    context = Object(context)
  }

  // 第一步 返回新函数
  const fBound = function(...args) {
    // 第二步 当返回的新函数作为构造函数使用时，之前指定的 this 就会失效，// 此时this 指向实例对象
    if (this instanceof fBound) {
      context = this
    }
    // 第一步 函数可以运行并返回结果
    // 第一步 传参做为新函数的参数
    return self.apply(context, [...bindArgs, ...args])
  }

  // 第二步 修改返回函数的原型对象，实例对象就可以从原函数对象上继承属性和方法
  fBound.prototype = Object.create(self.prototype)

  return fBound
}