/**
 * 防抖：将多次高频操作优化为只有最后一次执行，场景：用户输入，在用户输入完成后做校验
 *
 * @param   {Function}  func  要执行的函数
 * @param   {Number}  wait  时间间隔
 * @param   {Boolean} immediate 是否立即执行，也就是前置防抖
 * 
 * @return  {Function}  
 */
export function debounce(func, wait) {
  var timeout;
  return function() {
    clearTimeout(timeout)
    timeout = setTimeout(func, wait)
  }
}