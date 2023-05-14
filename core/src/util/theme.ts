import { useUiStore } from '../store/modules/ui'
import { mixColor, mixColorLevel9, textColor4grayLevel } from '../util/color'
import type { navTextColor } from '../types/ui'

const changeThemeDrak = (): void => {
    const uiStore = useUiStore()
    let dark: boolean = uiStore.getDark
    if (dark) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
    } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
    }
}

const changeThemeColor = () => {
    const uiStore = useUiStore()
    let color = uiStore.getThemeColor
    document.documentElement.style.setProperty('--el-color-primary', color);
    for (let i = 1; i <= 9; i++) {
        document.documentElement.style.setProperty('--el-color-primary-light-' + i, mixColor(color.substring(1), 'ffffff', 100 - i * 10));
    }
    document.documentElement.style.setProperty('--el-color-primary-dark-2', mixColor(color.substring(1), '000000', 80));
}

const changeNavColor = (): void => {
    const uiStore = useUiStore()
    let layout = uiStore.getLayout
    let bgColor: string = uiStore.getNavBgColor
    let navHoverBgColor: string = 'var(--el-menu-item-hover-fill)'
    let txtColor: navTextColor = '#E5EAF3'

    switch (layout) {
        case 'classic':
            bgColor = uiStore.getNavBgColor
            navHoverBgColor = mixColorLevel9(bgColor)[2]
            txtColor = textColor4grayLevel(uiStore.getNavColor)
            uiStore.setNavColor(txtColor)
            break;
        case 'left':
            bgColor = '#ffffff'
            txtColor = '#E5EAF3'
            break
    }

    document.documentElement.style.setProperty('--n-nav-text-color', txtColor)
    document.documentElement.style.setProperty('--n-nav-bg-color', bgColor)
    document.documentElement.style.setProperty('--n-nav-hover-bg-color', navHoverBgColor)
}

export {
    changeThemeDrak,
    changeThemeColor,
    changeNavColor
}