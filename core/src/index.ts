import type { App } from 'vue'
import banner from './banner'

import './scss/bootstrap.scss'

import { setupElementPlus, setupElementPlusDiscreteApi } from './plugins'
import { setupRouter } from './router'
import { setupStore } from './store'
import { outside } from './directive/outside'

export * from './component'
export * from './hook'
export { useUiStore } from './store/modules/ui'
export { config } from './config'

import components from './component'
import { changeThemeColor, changeThemeDrak } from './util/theme'

interface Config {
    GREET?: boolean
    STATIC_PATH?: string
    VIEWS?: Record<string, () => Promise<unknown>>
}

const INSTALLED_KEY = Symbol('INSTALLED_KEY')

const install = async (app: App, cfg: Config) => {
    if (app[INSTALLED_KEY]) return
    app[INSTALLED_KEY] = true

    // 欢迎语
    banner(cfg?.GREET)

    // 挂载状态管理
    setupStore(app)

    // 挂载 ElementPlus UI框架
    setupElementPlus(app)

    // 设置 ElementPlus UI框架脱离上下文 API
    setupElementPlusDiscreteApi()

    // 点击外部指令
    app.directive('clickOutside', outside)

    // 挂载路由
    setupRouter(app, cfg.VIEWS)

    components.forEach(component => {
        app.use(component as unknown as { install: () => any })
    })

    // 路由准备就绪后挂载 APP 实例
    // await router.isReady()

    changeThemeDrak()
    changeThemeColor()
}

export default install