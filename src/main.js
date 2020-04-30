import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import {
  message
} from '@/utils/resetMessage'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
/* import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
} */

// set ElementUI lang to EN
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.component(CollapseTransition.name, CollapseTransition)

Vue.prototype.$message = message

// 错误提示
Vue.prototype.$warn = function(msg) {
  message.error({
    showClose: true,
    message: msg,
    type: 'error'
  })
}
// 成功提示
Vue.prototype.$success = function(msg) {
  message.success({
    showClose: true,
    message: msg,
    type: 'success'
  })
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
