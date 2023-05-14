import type { RouteRecordRaw } from 'vue-router'
import { Layout } from './constant'

export const frameRoute: RouteRecordRaw = {
    path: '',
    redirect: '/dashboard'
}

export const redirectRoute: RouteRecordRaw = {
    path: '/redirect',
    name: 'Layout',
    component: Layout,
    meta: {
        title: '主页'
    }
}
