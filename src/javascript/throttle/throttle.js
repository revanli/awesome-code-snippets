/**
 * 节流：将高频次的操作优化为固定时间的低频操作，类似于水滴
 * TODO: head tail
 */
export function throttle(func, wait) {
  let timer = null;

  return function() {
    let context = this
    let args = arguments

    if (!timer) {
      timer = setTimeout(function() {
        timer = null
        func.apply(context, args)
      }, wait)
    }
  }
}