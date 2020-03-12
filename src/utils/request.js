import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store'
import { Api_url, Web_Api_url } from '@/api/URL'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // headers: {
  //   'X-Requested-With': 'XMLHttpRequest',
  //   'Content-Type': 'application/json;charset=utf-8'
  // },
  // baseURL: Api_url, // process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true // send cookies when cross-domain requests
  timeout: 5000 // request timeout\
})

service.defaults.withCredentials = true

// request interceptor
service.interceptors.request.use(
  config => {
    const reg = /([a-z]*)/
    const strUrl = reg.exec(config.url)[0]
    if (strUrl === 'web') {
      config.url = config.url.replace(strUrl, '')
      config.baseURL = Web_Api_url
    } else {
      config.baseURL = Api_url
    }
    // config.headers['common']['Content-Type'] = 'application/x-www-form-urlencoded'
    // do something before request is sent\
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['token'] = getToken()
    // }
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
    if (response.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      /* if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } */

      return Promise.reject(new Error(res.message || 'Error'))
    }

    return res
  },
  error => {
    console.log('error::::', error.response)
    if (error.response && error.response.data) {
      let msg
      switch (error.response.data.code) {
        case 400:
          msg = '数据格式不正确'
          break
        case 403:
          msg = '没有权限请重新登陆'
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
      if (!(error.response.data.code === 400)) {
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
