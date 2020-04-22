import { login /* logout */ } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { setLocal } from '@/utils/local'
import { Message } from 'element-ui'
import { getExamine, getStore } from '@/api/business.js'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: [], // admin 管理员  store 店长
  temp_Roles: [], // 登录时 临时 保存 角色
  examineStatus: null,
  messageToken: '',
  appKey: 'cpj2xarlchsmn',
  messageInit: false,
  storeStatus: null
}

const mutations = {
  SET_USERID: (state, messageToken) => {
    state.messageToken = messageToken
    setLocal('messageToken', messageToken)
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_NAME: (state, name) => {
    state.name = name
    setLocal('username', name)
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
    setLocal('avatar', avatar)
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
    setLocal('examineRoles', roles)
  },
  SET_STATUS: (state, examineStatus) => {
    state.examineStatus = examineStatus
    setLocal('examineStatus', examineStatus)
  },
  SET_STORESTATUS: (state, storeStatus) => {
    state.storeStatus = storeStatus
    setLocal('storeStatus', storeStatus)
  },
  // 临时保存角色
  SET_TEMP_ROLES: (state, roles) => {
    state.temp_Roles = roles
    setLocal('temp_Roles', roles)
  },
  SET_messageInit: (state, flag = true) => {
    state.messageInit = flag
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { phone, code } = userInfo
    return new Promise((resolve, reject) => {
      login({ phone, code }).then(response => {
        if (response.code) {
          response.message && Message({
            message: response.message || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
        }
        const { data } = response
        commit('SET_TOKEN', data.nickName)
        commit('SET_AVATAR', data.logo)
        commit('SET_USERID', data.token)
        // 临时保存
        // 规避router 问题
        // const routers = JSON.parse(data.json)
        // console.log('data JSON.parse', typeof routers)
        // asyncRoutes.push(routers)
        commit('SET_NAME', data.nickName)

        getExamine().then(res => {
          if (res.code) this.$warn(res.message)
          commit('SET_STATUS', res.data.status || 0)
        })
        getStore().then(res => {
          if (res.code) this.$warn(res.message)
          commit('SET_STORESTATUS', res.data.status || 0)
        })
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const roles = [state.token]
      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        reject('没有权限!')
      }
      commit('SET_ROLES', [...roles])

      resolve({ roles })

      /* getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar } = data

        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      }) */
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_NAME', '')
      commit('SET_AVATAR', '')
      commit('SET_STATUS', '')
      commit('SET_TEMP_ROLES', [])
      commit('SET_USERID', '')
      removeToken()
      resetRouter()
      resolve()
      /*  logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      }) */
    })
  }

  // // remove token
  // resetToken({ commit }) {
  //   return new Promise(resolve => {
  //     commit('SET_TOKEN', '')
  //     commit('SET_ROLES', [])
  //     commit('SET_NAME', '')
  //     commit('SET_AVATAR', '')
  //     commit('SET_STATUS', '')
  //     commit('SET_TEMP_ROLES', [])
  //     removeToken()
  //     resolve()
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

