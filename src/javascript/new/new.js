/**
 * new思路
 * 1. 创建一个新对象
 * 2. this 指向这个新对象
 * 3. 执行构造函数中的代码
 * 4. 返回新对象
 */
export function objectFactory(constructor, ...args) {
  if (typeof constructor !== 'function') {
    throw new Error('constructor needed to be argument')
  }

  // 创建一个实例对象
  const instance = Object.create(constructor.prototype)
  // 调用构造器，并改变 this 指向实例
  var ret = constructor.apply(instance, args)
  // 如果构造器返回值是对象则返回这个对象，如果不是对象则返回新的实例对象
  return ret instanceof Object ? ret : instance
}