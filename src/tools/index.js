// 节流函数
export function throttle(fn, time) {
  let flag = true
  return (...args) => {
    if(!flag) return
    flag = false
    setTimeout(() => {
      fn.call(this, args)
      flag = true
    }, time)
  }
}
