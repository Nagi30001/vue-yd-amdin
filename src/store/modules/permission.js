import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * 使用元。角色，以确定当前用户是否具有权限
 * @param roles 权限数组
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    // 返回role角色是否在route中 在有数据,不在没有数据
    roles.some(role => console.log(role))
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 没有meta || 没有roles 属性,相当于有没有相应的权限都可以访问
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    // route数组
    const tmp = { ...route }
    // 判断 当前组件的权限有没有 在 roles 中
    if (hasPermission(roles, tmp)) {
      // 有权限 || 没有设置权限
      // 有没有子路径
      if (tmp.children) {
        // 有子路径的情况,将调用自己 把 tmp 的子路径设置成权限分析过后的
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  // 登陆用户的全部路由映射(包含下面的需要权限的)
  routes: [],
  // 保存对应权限的路由映射
  addRoutes: []
}


const mutations = {
  // 将routes数据赋值到state.routes
  SET_ROUTES: (state, routes) => {
    // 保存对应权限的路由映射
    state.addRoutes = routes
    // 把不需要权限的和需要权限的都赋值给 routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  // 通过角色权限数据 获取routes数据
  // 根据角色生成可访问路由映射
  // 登陆时第一次调用
  // 这里主要处理需要权限的路由映射
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // 判断用户角色包含的角色字段
      if (roles.includes('R1001')) {
        console.log('包含R1001')
        // 获取全部路由映射
        accessedRoutes = asyncRoutes || []
      } else {
         console.log('不包含R1001')
         console.log(roles)
        // 获取异步路由
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      // 将可访问的路由映射保存
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
