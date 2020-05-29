import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store'
import { Api_url, Web_Api_url } from '@/api/URL'
import { getLocal } from '@/utils/local'
// import { getToken } from '@/utils/auth'
import { judgeIndex } from '@/utils/judge'

const whiteAuthApi = ['/boss/v2/examine']
const whiteStoreApi = ['/boss/v2/store', '/boss/v2/category', '/wx/pay', '/ChinaCity']

// create an axios instance
const service = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=utf-8'
  },
  // baseURL: '', // process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout\
})

// service.defaults.withCredentials = true
// let cancel
// request interceptor
service.interceptors.request.use(
  config => {
    const urlKey = config.url.split('/')[1]
    const urlConst = config.url.split('.com/')[0]
    // const urlIndex = config.url.indexOf(whiteStoreApi[1])
    // const payIndex = config.url.indexOf(whiteStoreApi[2])
    if (urlKey === 'boss') {
      if (Number(getLocal('examineStatus')) !== 1) {
        if (!whiteAuthApi.includes(urlConst)) return Promise.reject(new Error(''))
      }
      if (Number(getLocal('storeStatus')) !== 1) {
        console.log(!whiteAuthApi.includes(urlConst) && !judgeIndex(whiteStoreApi, config.url), config.url)
        if (!whiteAuthApi.includes(urlConst) && !judgeIndex(whiteStoreApi, config.url)) return Promise.reject(new Error(''))
      }
    }
    const strUrl = config.url.split('/').includes('ChinaCity')
    if (strUrl) {
      config.baseURL = Web_Api_url
    } else {
      config.baseURL = Api_url
    }

    if (config.url.indexOf('/VodStsForApp') !== -1) {
      config.url = config.url.replace('/boss', '')
      config.baseURL = Web_Api_url
    }
    // config.headers['common']['Content-Type'] = 'application/x-www-form-urlencoded'

    // do something before request is sent\
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['token'] = getToken()
    // }
    // console.log(store.getters.token)
    return config
  },
  error => {
    // do something with request error
    console.log('error::::::::::', error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    let msg
    if (res.code === 403) {
      msg = '请重新登录'
      store.dispatch('user/logout')
      setTimeout(() => {
        router.replace({ path: '/login', params: { redirect: router.currentRoute.fullPath }})
      }, 1000)
    }
    if (res.code === 401) msg = '没有权限'
    if (msg) {
      Message({
        message: msg,
        type: 'error',
        duration: 1 * 1000
      })
    }
    return res
  },
  error => {
    if (error.response && error.response.data) {
      let msg
      switch (error.response.data.code) {
        case 400:
          msg = error.response.data.message || '数据格式不正确'
          break
        case 401:
          msg = '没有权限'
          break
        case 403:
          msg = '请重新登录'
          break
        case 500:
          msg = '系统异常，请联系管理员'
          break
        default:
          msg = '系统异常，请重新登陆'
      }
      Message({
        message: msg,
        type: 'error',
        duration: 1 * 1000
      })
      if (!(error.response.data.code === 400 || error.response.data.code === 401)) {
        store.dispatch('user/logout')
        setTimeout(() => {
          router.replace({ path: '/login', params: { redirect: router.currentRoute.fullPath }})
        }, 1000)
      }
    }
    return Promise.reject(error)
  }
)

export default service
