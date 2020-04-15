export function toThousands(num) {
  let nums = (num || 0).toString()
  let result = ''
  while (nums.length > 3) {
    result = ',' + nums.slice(-3) + result
    nums = nums.slice(0, nums.length - 3)
  }
  if (nums) { result = nums + result }
  return result
}
