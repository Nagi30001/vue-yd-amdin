// 处理登陆/登出/获取权限/获取token

import { login, logout, getInfo, getUsers, addUser, checkJobNum, updateUser } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userMsg: ''

}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER: (state, userMsg) => {
    state.userMsg = userMsg
  }
}

const actions = {
  // user login
  // 用户登陆
  login({ commit }, userInfo) {
    // 获取账户密码
    const { username, password } = userInfo
    //
    return new Promise((resolve, reject) => {
      // 发送login请求 上方的api导入的请求
      login({ username: username.trim(), password: password }).then(response => {
        // 响应成功获取数据
        const data = response
        // 判断是普通用户还是平台用户
        // 新增:
        // 获取用户完整信息,获取城市权限
        // 发送异步请求 => 获取平台信息/车型信息/报单列表/销售类型/附加业务信息
        // 调用SET_TOKEN,设置token
        commit('SET_TOKEN', data.token)

        // 也是设置token?
        setToken(data.token)
        // 回调
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  // 获取用户信息--src/permission.js 调用此函数
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const data = response

        // 判断数据是否为空
        if (!data) {
          // 为空
          reject('Verification failed, please Login again.')
        }

        // 通过token获取的数据在解析为数组-角色,-姓名,-头像,-个人介绍
        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        // 角色必须是非空数组
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        // 设置相应的属性
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_USER', data.user)
        console.log(state)
        console.log(data)
        // 回调函数
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  // 用户登出
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        // dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  // 删除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  // 动态地修改权限
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const res = await dispatch('getInfo')
      console.log(res)
      resetRouter()

      // generate accessible routes map based on roles
      // 根据角色生成可访问路由映射
      const accessRoutes = await dispatch('permission/generateRoutes', res.roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      // 重置已访问的视图和缓存的视图
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },
  getUsers({ commit }) {
    return new Promise((resolve, reject) => {
      getUsers(getToken()).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 添加用户
  addUser({ commit }, userMsg) {
    return new Promise((resolve, reject) => {
      addUser(getToken(), { token: getToken(), data: userMsg }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 检查工号是否被占用
  checkJobNum({ commit }, value) {
    return new Promise((resolve, reject) => {
      checkJobNum(getToken(), value).then(res => {
        resolve(res)
      })
    })
  },

  // 更新用户信息
  updateUser({ commit }, userMsg) {
    return new Promise((resolve, reject) => {
      updateUser(getToken(), { token: getToken(), data: userMsg }).then(res => {
        resolve(res)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
