// 使用upc登录，一般用于内部系统
import AuthUtils from "utils/UpcAuthUtils.js"
// 使用小米网登录，一般用于对外系统
// import AuthUtils from "utils/MiAuthUtils.js"

import allMenus from "router/menus.js"

function filterRoutes(allowedUrls) {
  // 计算出有权限的路由
  const allowedRoutes = []
  let allowedUrlMap = allowedUrls.reduce((ret, url) => {
    ret[url.replace(/^\/|\/$/g, "")] = 1
    return ret
  }, {})
  const hasPermission = route => {
    if (route.meta && route.meta.upcPermission) {
      if (allowedUrlMap[route.path.replace(/^\/|\/$/g, "")]) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }
  allMenus.forEach(route => {
    if (hasPermission(route)) {
      // 有权限
      const newRoute = { ...route }
      allowedRoutes.push(newRoute)
      if (route.children) {
        const newChildren = []
        route.children.forEach(subRoute => {
          if (hasPermission(subRoute)) {
            // 有权限的二级路由
            newChildren.push(subRoute)
          }
        })
        if (newChildren.length > 0) {
          newRoute.children = newChildren
        }
      }
    }
  })

  return allowedRoutes
}

export default {
  namespaced: true,
  state: {
    loaded: false,
    name: "",
    avatar: "",
    logined: false,
    allowedUrls: [],
    allowedRoutes: []
  },
  mutations: {
    set_user(state, user) {
      state.name = user.name
      state.avatar = user.avatar
      state.logined = true
    },
    set_loaded(state) {
      state.loaded = true
    },
    set_allowedRoutes(state, routes) {
      state.allowedRoutes = routes
    },
    set_allowedUrls(state, allowedUrls) {
      state.allowedUrls = allowedUrls
    }
  },
  actions: {
    async getLoginInfo({ commit }) {
      try {
        const user = await AuthUtils.getLoginInfo()
        commit("set_user", user)
      } catch (e) {
        console.log("获取登录信息失败: ", e)
      }
      commit("set_loaded")
    },
    async getMenuInfo({ commit }) {
      let allowedUrls = []
      try {
        allowedUrls = (await AuthUtils.getPermissionInfo()).allowedUrls
      } catch (e) {
        console.log("获取权限数据失败: ", e)
      }

      const allowedRoutes = filterRoutes(allowedUrls)
      commit("set_allowedUrls", allowedUrls)
      commit("set_allowedRoutes", allowedRoutes)
      window.allowedRoutes = allowedRoutes
    }
  }
}
