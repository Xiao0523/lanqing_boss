import { adminRoutes, storeRoutes, constantRoutes } from '@/router'
import { deepClone } from '@/utils/deepClone'
import { getLocal } from '@/utils/local'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 *
 * @param {arr} clientAsyncRoutes 前端保存动态路由
 * @param {arr} serverRouter 后端保存动态路由
 */
// function makePermissionRouters(serverRouter, clientAsyncRoutes) {
//   console.log(serverRouter)
//   clientAsyncRoutes.map(ele => {
//     if (!ele.name || (!ele.meta && !ele.meta.roles)) return
//     let roles_obj
//     for (let i = 0; i < serverRouter.length; i++) {
//       const element = serverRouter[i]
//       if (ele.name === element.name) {
//         roles_obj = element
//       }
//     }
//     ele.meta.roles = roles_obj.meta.roles

//     if (ele.children) {
//       makePermissionRouters(serverRouter, ele.children)
//     }
//   })
//   return clientAsyncRoutes
// }

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

// function getRouter(newRouter, routers) {
//   const PermissionRouters = makePermissionRouters(newRouter, routers)
//   return PermissionRouters
// }

const actions = {
  generateRoutes({ commit }, roles) {
    const role = getLocal('temp_Roles')[0]
    let clientRoute
    if (role === 'store') {
      clientRoute = storeRoutes
    } else {
      clientRoute = adminRoutes
    }
    const PermissionRouters = deepClone(clientRoute)
    // const PermissionRouters = getRouter(mockRouters, clientRoutes)
    console.log(PermissionRouters)
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        console.log(PermissionRouters)
        accessedRoutes = PermissionRouters || []
      } else {
        accessedRoutes = filterAsyncRoutes(PermissionRouters, roles)
      }
      console.log(accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
