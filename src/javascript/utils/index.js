
export function sleep(ms = 0, needReject = false) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      needReject ? reject(ms) : resolve(ms)
    }, ms);
  })
}