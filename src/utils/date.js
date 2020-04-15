/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time = 0, format = 'YYYY-MM-DD hh:mm:ss') {
  const now = new Date().getTime()
  if (!time) time = now
  while (time.toString().length < 13) time += '0'
  const date = new Date(time)
  date.getMonth()
  /** 参数集 年-月-日 时:分:秒 */
  const arg = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  }
  if (arg.day < 10) {
    arg.day = '0' + arg.day
  }
  if (arg.minutes < 10) {
    arg.minutes = '0' + arg.minutes
  }
  /** 判断有没有指定的时间格式 */
  switch (format) {
    case 'YYYY-MM-DD hh:mm:ss':
      return `${arg.year}-${arg.month}-${arg.day} ${arg.hours}:${arg.minutes}:${arg.seconds}`
    case 'YYYY-MM-DD':
      return `${arg.year}-${arg.month}-${arg.day}`
    case 'MM-DD':
      return `${arg.month}-${arg.day}`
    case 'hh:mm:ss':
      return `${arg.hours}:${arg.minutes}:${arg.seconds}`
    case 'hh:mm':
      return `${arg.hours}:${arg.minutes}`
    case 'computed': // 判断是不是需要进行计算
      if (now > time) {
        const dt = Math.abs(time - now) // 时间已过去多少毫秒
        const S = dt / 1000 // 秒
        const M = S / 60 // 分
        const H = M / 60 // 小时
        const D = H / 24 // 天
        const W = D / 7 // 周
        if (~~W > 0 && W < 3) {
          return ~~W + '周前'
        } else if (D < 7 && ~~D > 0) {
          return ~~D + '天前'
        } else if (~~H > 0 && H < 24) {
          return ~~H + '小时前'
        } else if (~~M > 0 && M < 60) {
          return ~~M + '分钟前'
        } else if (~~S > 0 && S < 60) {
          return ~~S + '秒前'
        }
      } else {
        console.log('未来的时间')
      }
      return `${arg.year}-${arg.month}-${arg.day} ${arg.hours}:${arg.minutes}:${arg.seconds}`
  }
}
/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}
