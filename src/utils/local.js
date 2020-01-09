export function getLocal(key) {
  const value = localStorage.getItem(key)
  return JSON.parse(value)
}

export function setLocal(key, value) {
  /*
  * set 存储方法
  * @ param {String}  key 键
  * @ param {String}  value 值，
  * @ param {String}  expired 过期时间，以分钟为单位，非必须
  */
  localStorage.setItem(key, JSON.stringify(value))
  return value
}
