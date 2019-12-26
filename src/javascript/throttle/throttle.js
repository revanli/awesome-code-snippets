/**
 * 节流：将高频次的操作优化为固定时间的低频操作，类似于水滴
 * 
 */
export function throttle(func, wait) {
  let timer = null;
  let context, args;


  return function() {
    context = this
    args = arguments

    if (!timer) {
      timer = setTimeout(function() {
        timer = null
        func.apply(context, args)
      }, wait)
    }
  }
}