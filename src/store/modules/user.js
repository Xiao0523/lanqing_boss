import { login /* logout */ } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { setLocal } from '@/utils/local'
import { Message } from 'element-ui'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: [], // admin 管理员  store 店长
  temp_Roles: [], // 登录时 临时 保存 角色
  examineStatus: 0
}

const mutations = {
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
  // 临时保存角色
  SET_TEMP_ROLES: (state, roles) => {
    state.temp_Roles = roles
    setLocal('temp_Roles', roles)
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, code } = userInfo
    return new Promise((resolve, reject) => {
      login({ username, password, code }).then(response => {
        if (response.code) {
          return response.message && Message({
            message: response.message || 'Error',
            type: 'error',
            duration: 5 * 1000
          })
        }
        const { data } = response
        commit('SET_TOKEN', data.role)
        // 临时保存
        // 规避router 问题
        if (data.role === 'store') {
          commit('SET_TEMP_ROLES', ['store'])
          setToken('store')
        } else {
          commit('SET_TEMP_ROLES', [data.role])
          setToken(data.role)
        }
        // const routers = JSON.parse(data.json)
        // console.log('data JSON.parse', typeof routers)
        // asyncRoutes.push(routers)
        commit('SET_NAME', userInfo.username)
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
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_NAME', '')
      commit('SET_AVATAR', '')
      commit('SET_STATUS', '')
      commit('SET_TEMP_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

