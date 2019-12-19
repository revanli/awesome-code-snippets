export default function (...bindArgs) {
  // 调用 bind 函数本身
  const self = this
  // 传进来的 this 对象
  const context = bindArgs.shift()

  const fBound = function(...args) {
    // 函数运行并返回结果
    return self.apply(context, [...bindArgs, ...args])
  }

  return fBound
}