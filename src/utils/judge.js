export function judgeIndex(arr, url) {
  for (const item of arr) {
    if (url.indexOf(item) !== -1) {
      return true
    }
  }
  return false
}
