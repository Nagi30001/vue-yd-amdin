<template>
  <!-- 侧边栏单一模块 -->
  <!-- 判断!是否隐藏 -->
  <!-- item是路由映射 -->
  <!-- 最外层模块 -->
  <div v-if="!item.hidden">
    <!-- 组件模块 -->
    <!-- 判断item有没有子路由 1\判断理由有没有子路由并赋值,根据子路由多少选择什么 2、子路由有没有子路由或者,子路由有没有不显示的子路由 3、路由总是显示 -->
    <!-- 有子路由 -->
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <!-- 组件访问的路径 -->
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <!-- 图标 标题 -->
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>
    
    <!-- 没有子路由 -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function  用渲染函数重构
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      // 获取最外层路由映射的孩子将他们的状态返回
      const showingChildren = children.filter(item => {
        // 判断路由映射是否显示
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child) 如果只有一个显示子节点，则使用Temp set
          // 当前子路由
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default 当只有一个子路由器时，默认显示子路由器
      // 判断那些子路由长度
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display 如果没有要显示的子路由器，则显示父路由器
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      // 判断路径是否符合正则表达式
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      // 检查拼接
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
