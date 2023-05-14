import { defineStore } from 'pinia'
import { store } from '../index'
import type { layoutType, navTextColor } from '../../types/ui'
import { useCache } from '../../hook/web/useCache'

const { wsCache } = useCache('localStorage')

interface UiState {
    dark: boolean
    layout: layoutType
    breadcrumb: boolean
    refresh: boolean
    collapse: boolean
    tabview: boolean
    themeColor: string
    navColor: navTextColor
    navBgColor: string
}

export const useUiStore = defineStore('app', {
    state: (): UiState => {
        return {
            dark: wsCache.get('dark') === null ? false : wsCache.get('dark'),
            layout: wsCache.get('layout') || 'classic',
            breadcrumb: wsCache.get('breadcrumb') === null ? true : wsCache.get('breadcrumb'),
            refresh: wsCache.get('refresh') === null ? true : wsCache.get('refresh'),
            collapse: wsCache.get('collapse') === null ? false : wsCache.get('collapse'),
            tabview: wsCache.get('tabview') === null ? true : wsCache.get('tabview'),
            themeColor: wsCache.get('themeColor') || '#2f54eb',
            navColor: wsCache.get('navColor') || '#E5EAF3',
            navBgColor: wsCache.get('navBgColor') || '#001428'
        }
    },
    getters: {
        getDark(): boolean {
            return this.dark
        },
        getLayout(): layoutType {
            return this.layout
        },
        getBreadcrumb(): boolean {
            return this.breadcrumb
        },
        getRefresh(): boolean {
            return this.refresh
        },
        getCollapse(): boolean {
            return this.collapse
        },
        getTabview(): boolean {
            return this.tabview
        },
        getThemeColor(): string {
            return this.themeColor
        },
        getNavColor(): navTextColor {
            return this.navColor
        },
        getNavBgColor(): string {
            return this.navBgColor
        }
    },
    actions: {
        setLayout(layout: layoutType) {
            this.layout = layout
            wsCache.set('layout', this.layout)
        },
        setDark(dark: boolean) {
            this.dark = dark
            wsCache.set('dark', this.dark)
        },
        setBreadcrumb(breadcrumb: boolean) {
            this.breadcrumb = breadcrumb
            wsCache.set('breadcrumb', this.breadcrumb)
        },
        setRefresh(refresh: boolean) {
            this.refresh = refresh
            wsCache.set('refresh', this.refresh)
        },
        setCollapse(collapse: boolean) {
            this.collapse = collapse
            wsCache.set('collapse', this.collapse)
        },
        setTabview(tabview: boolean) {
            this.tabview = tabview
            wsCache.set('tabview', this.tabview)
        },
        setThemeColor(themeColor: string) {
            this.themeColor = themeColor
            wsCache.set('themeColor', this.themeColor)
        },
        setNavColor(navColor: navTextColor) {
            this.navColor = navColor
            wsCache.set('navColor', this.navColor)
        },
        setNavBgColor(navBgColor: string) {
            this.navBgColor = navBgColor
            wsCache.set('navBgColor', this.navBgColor)
        }
    }
})

export const useUiStoreWithOut = () => {
    return useUiStore(store)
}