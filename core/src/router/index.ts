import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createGuard } from '@/router/guard'


const redirectRoute: RouteRecordRaw = {
  path: '',
  redirect: '/dashboard'
}

const frameRoute: RouteRecordRaw = {
  name: 'layout',
  path: '/',
  component: () => import('../layout/layout.vue')
}



// 默认路由
export const constantRouter: RouteRecordRaw[] = [
  frameRoute,
  redirectRoute
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouter,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const setupRouter = (app: App, routes?: Record<string, () => Promise<unknown>>): void => {

  if (routes) {
    router.addRoute('layout', {
      path: '/dashboard',
      meta: {
        name: '控制台'
      },
      component: routes[`./views/dashboard.vue`]
    })
    router.addRoute('layout', {
      path: '/profile/info',
      meta: {
        name: '个人资料'
      },
      component: routes[`./views/profile/info.vue`]
    })
  }

  app.use(router)

  // 创建路由守卫
  createGuard(router)
  
}

export default router
