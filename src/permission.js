import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration NProgress配置

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist 不重定向白名单

router.beforeEach(async(to, from, next) => {
  // start progress bar 开始进度条 进度条效果
  NProgress.start()

  // set page title 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in 确定用户是否已登录
  // 获取token
  const hasToken = getToken()
  
  // 判断token是否有
  if (hasToken) {
	  // 如果将跳转到/login
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
	  // 直接重定向到主页
      next({ path: '/' })
      NProgress.done()
	  // 如果不是跳转/login
    } else {
      // determine whether the user has obtained his permission roles through getInfo
	  // 确定用户是否通过getInfo获得了他的权限角色
	  // 判断他的权限数据是否>0
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
		// 大于0 直接跳转他要去的页面
        next()
		// 不大于0
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
		  // 注意:角色必须是一个对象数组!例如:['admin']或，['developer'，'editor']
		  // 发送请求获取对象数组 
		  // async 作为一个关键字放到函数前面，用于表示函数是一个异步函数
		  // await 表示等一下 这里说明等待 store.dispatch('user/getInfo') 返回的数据
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          // 根据角色生成可访问路由映射
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          // 动态添加可访问路由
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // 破解方法，以确保addRoutes是完整的
          // set the replace: true, so the navigation will not leave a history record
          // 设置replace: true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          // 删除令牌，进入登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          // 重定向-后面的语句是登陆后继续访问这个路径?
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
