export function deepClone(obj) {
  const newObj = obj.push ? [] : {}
  for (const attr in obj) {
    if (typeof obj[attr] === 'object') {
      newObj[attr] = deepClone(obj[attr])
    } else {
      newObj[attr] = obj[attr]
    }
  }
  return newObj
}
