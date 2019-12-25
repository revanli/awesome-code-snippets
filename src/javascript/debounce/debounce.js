/**
 * 防抖：将多次高频操作优化为只有最后一次执行，场景：用户输入，在用户输入完成后做校验
 *
 * @param   {Function}  func  要执行的函数
 * @param   {Number}  wait  时间间隔
 * @param   {Boolean} immediate 是否立即执行，立即执行就是前置防抖, 之后执行的是后置防抖
 * 
 * @return  {Function}  
 */
export function debounce(func, wait, immediate) {
  var timer = null;
  // func 有返回值需要返回
  var result;

  return function() {
    // this的指向
    var context = this
    // 提取原函数的参数
    var args = arguments

    const needCallNow = immediate && !timer

    clearTimeout(timer)
    timer = setTimeout(function() {
      timer = null
      if (!immediate) {
        func.apply(context, args)
      }
    }, wait)

    if (needCallNow) {
      result = func.apply(context, args)
    }

    return result
  }
}