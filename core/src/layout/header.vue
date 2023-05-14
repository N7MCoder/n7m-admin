<script lang="ts" setup>
import type { layoutType, navTextColor } from '../types/ui'
import { computed, ref, watch } from 'vue'
import { useUiStore } from '../store/modules/ui'
import { changeThemeDrak, changeThemeColor, changeNavColor } from '../util/theme'

const uiStore = useUiStore()

const drawer = ref(false)

// --- 背景色 ------------------------------
const background = computed<string>((): string => {
    const drak = uiStore.getDark
    if (drak) {
        return 'var(--el-bg-color)'
    } else {
        const layout = uiStore.getLayout
        if (layout == 'classic') {
            return '#fff'
        } else {
            return 'var(--el-color-primary)'
        }
    }
})

// --- 文字颜色 ------------------------------
const txtColor = computed<navTextColor>((): navTextColor => {
    const drak = uiStore.getDark
    if (drak) {
        return '#E5EAF3'
    } else {
        const layout = uiStore.getLayout
        if (layout == 'classic') {
            return '#303133'
        } else {
            return '#E5EAF3'
        }
    }
})

// --- 鼠标经过 ------------------------------
const hsla = computed(() => {
    let layout = uiStore.getLayout
    if (layout == 'classic') {
        return 'hsla(0, 0%, 50%, 0.1)'
    } else {
        return 'hsla(0, 0%, 100%, 0.3)'
    }
})


// --- 菜单折叠 ------------------------------
const collapse = computed(() => uiStore.getCollapse)
const collapseToggle = (): void => {
    uiStore.setCollapse(!collapse.value)
}

const command = (index: String): void => {
    if (index == 'theme') {
        drawer.value = true
    }
}

const expSet = (): void => {

}

// --- 切换主题------------------------------
const isDark = ref(uiStore.getDark)
const themeChange = (value: boolean): void => {
    uiStore.setDark(value)
    changeThemeDrak()
}

// --- 切换布局 ------------------------------
const layout = computed(() => uiStore.getLayout)
const changeLayout = (layout: layoutType): void => {
    uiStore.setLayout(layout)
}

// --- 主题颜色 ------------------------------
const colors = ref<Array<string>>([
    '#2f54eb',
    '#409eff',
    '#ff4848',
    '#ee4f12',
    '#faad14',
    '#009688',
    '#66de93',
    '#ff5c93',
    '#722ed1',
    '#0a1d37',
    '#1768ac',
    '#5172dc',
    '#ff3d68'
])
const themeColor = computed(() => uiStore.getThemeColor)
const diyColor = ref()
if (!colors.value.includes(themeColor.value)) {
    diyColor.value = themeColor.value
}
const setThemeColor = (color: string): void => {
    diyColor.value = null
    uiStore.setThemeColor(color)
    changeThemeColor()
}
watch(() => diyColor.value, (val) => {
    if (val) {
        uiStore.setThemeColor(val)
        changeThemeColor()
    }
})

// --- 导航颜色 ------------------------------
const navColors = ref<Array<string>>([
    '#001428',
    '#ffffff',
    '#273352',
    '#f34b4b',
    '#018235',
    '#0d0094'
])
const navColor = computed(() => uiStore.getNavBgColor)
const diyNavColor = ref()
if (!navColors.value.includes(navColor.value)) {
    diyNavColor.value = navColor.value
}
const setNavColor = (color: string): void => {
    diyNavColor.value = null
    uiStore.setNavBgColor(color)
    changeNavColor()
}

watch(() => diyNavColor.value, (val) => {
    if (val) {
        uiStore.setNavBgColor(val)
        changeNavColor()
    }

})

// --- 面包导航 -----------------------
const breadcrumb = ref<boolean>(uiStore.getBreadcrumb)

const breadcrumbChange = (value: boolean): void => {
    uiStore.setBreadcrumb(value)
}

// --- 刷新按钮 -----------------------
const refresh = ref<boolean>(uiStore.getRefresh)

const refreshChange = (value: boolean): void => {
    uiStore.setRefresh(value)
}

// --- 标签页 -------------------------
const tabview = ref<boolean>(uiStore.getTabview)

const tabviewChange = (value: boolean): void => {
    uiStore.setTabview(value)
}

</script>
<template>
    <header class="n-header p-0 overflow-hidden d-flex pl-20 pr-10" :style="{ background: background }">
        <div class="d-flex nav h-100">
            <div class="fold text-white h-100 d-flex justify-content-center align-items-center cursor-pointer" @click="collapseToggle">
                <svg v-if="collapse" viewBox="0 0 1024 1024" width="20" height="20">
                    <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zM400 646c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zM904 160H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM904 792H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519c4.5-3.5 4.5-10.3 0-13.9L142.4 381.9c-5.8-4.6-14.4-0.5-14.4 6.9v246.3c0 7.4 8.5 11.6 14.4 7z" :fill="txtColor" />
                </svg>
                <svg v-if="!collapse" viewBox="0 0 1024 1024" width="20" height="20">
                    <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zM400 646c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zM904 160H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM904 792H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4 0.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1c-4.5 3.5-4.5 10.3 0 13.8z" :fill="txtColor" />
                </svg>
            </div>
        </div>
        <div class="mh-100 flex-fill d-flex align-items-center px-10">
            <el-icon class="cursor-pointer" :size="20" :color="txtColor" v-if="refresh">
                <RefreshRight />
            </el-icon>
            <el-breadcrumb class="pl-10" separator="/" v-if="breadcrumb">
                <el-breadcrumb-item>控制台</el-breadcrumb-item>
                <el-breadcrumb-item>商城</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="profile d-flex mh-100">
            <div class="d-flex justify-content-center align-items-center px-15">
                <el-icon :color="txtColor">
                    <search />
                </el-icon>
            </div>
            <div class="notify d-flex justify-content-center align-items-center px-15">
                <el-popover placement="bottom" :width="200" trigger="hover">
                    <template #reference>
                        <div class="h-100 d-flex justify-content-center align-items-center">
                            <el-badge type="danger" :max="5">
                                <el-icon :color="txtColor">
                                    <bell />
                                </el-icon>
                            </el-badge>
                        </div>
                    </template>
                    <div>
                    </div>
                </el-popover>
            </div>
            <slot v-if="$slots['extend']" name="extend" />
            <div class="user d-flex justify-content-center align-items-center px-15">
                <el-dropdown class="h-100" @command="command">
                    <div class="el-dropdown-link">
                        <div class="h-100 d-flex justify-content-center align-items-center">
                            <div class="avatar d-flex justify-content-center align-items-center">
                                <el-image style="width: 24px; height: 24px" class="rounded-circle" fit="cover" src="https://oss.nunumao.cc/website/5d4c1293915ce086f65300.png" />
                            </div>
                            <div class="pl-10" :style="{ color: txtColor }">欢迎您，超级管理员</div>
                        </div>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu class="d1-dropdown">
                            <el-dropdown-item icon="User" command="profile">个人中心</el-dropdown-item>
                            <el-dropdown-item icon="Setting" command="account">账户设置</el-dropdown-item>
                            <el-dropdown-item icon="Lock" command="password">修改密码</el-dropdown-item>
                            <el-dropdown-item icon="Brush" command="theme">主题设置</el-dropdown-item>
                            <el-dropdown-item icon="RefreshRight" command="cache">清理缓存</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div class="exit d-flex align-items-center my-10 px-10">
                <svg viewBox="64 64 896 896" width="14" height="14" :fill="txtColor">
                    <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z" />
                </svg>
                <div>&nbsp;退出登录</div>
            </div>
        </div>
        <el-drawer v-model="drawer" title="主题模式" direction="rtl" size="300px">
            <div class="theme h-0 flex-fill">
                <el-scrollbar height="100%">
                    <div class="theme-box">
                        <div class="theme-title">
                            <el-divider content-position="left">主题切换</el-divider>
                        </div>
                        <div class="theme-content">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>{{ isDark ? '白日' : '黑夜' }}模式</div>
                                <el-switch v-model="isDark" inline-prompt active-icon="Sunny" inactive-icon="Moon" @change="themeChange" />
                            </div>
                        </div>
                    </div>
                    <div class="theme-box pt-10">
                        <div class="theme-title">
                            <el-divider content-position="left">主题颜色</el-divider>
                        </div>
                        <div class="theme-content">
                            <div class="d-flex flex-wrap">
                                <div class="color-item d-flex justify-content-center align-items-center position-relative" v-for="item in colors" :style="{ 'background-color': item }" @click="setThemeColor(item)">
                                    <el-icon color="#fff" v-if="themeColor == item">
                                        <Check />
                                    </el-icon>
                                </div>
                                <el-color-picker v-model="diyColor" />
                            </div>
                        </div>
                    </div>
                    <div class="theme-box pt-10">
                        <div class="theme-title">
                            <el-divider content-position="left">页面布局</el-divider>
                        </div>
                        <div class="theme-content">
                            <div class="thumb-layout d-flex flex-wrap">
                                <div class="layout-classic cursor-pointer" @click="changeLayout('classic')">
                                    <div class="thumb-layout-active" v-if="layout == 'classic'"></div>
                                </div>
                                <div class="layout-lefttop cursor-pointer" @click="changeLayout('left')">
                                    <div class="thumb-layout-active" v-if="layout == 'left'"></div>
                                </div>
                                <div class="layout-cut cursor-pointer" @click="changeLayout('cut')">
                                    <div class="layout-cut-child"></div>
                                    <div class="thumb-layout-active" v-if="layout == 'cut'"></div>
                                </div>
                                <div class="layout-top cursor-pointer" @click="changeLayout('top')">
                                    <div class="thumb-layout-active" v-if="layout == 'top'"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="theme-box pt-10" v-if="layout == 'classic'">
                        <div class="theme-title">
                            <el-divider content-position="left">导航颜色</el-divider>
                        </div>
                        <div class="theme-content">
                            <div class="d-flex flex-wrap">
                                <div class="color-item d-flex justify-content-center align-items-center position-relative" v-for="item in navColors" :style="{ 'background-color': item }" @click="setNavColor(item)">
                                    <el-icon :color="item === '#ffffff' ? '#000' : '#fff'" v-if="navColor == item">
                                        <Check />
                                    </el-icon>
                                    <div class="ffbd" v-if="item == '#ffffff'"></div>
                                </div>
                                <el-color-picker v-model="diyNavColor" />
                            </div>
                        </div>
                    </div>
                    <div class="theme-box pt-10">
                        <div class="theme-title">
                            <el-divider content-position="left">页面功能</el-divider>
                        </div>
                        <div class="theme-content">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>固定顶栏</div>
                                <div><el-switch v-model="isDark" /></div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-10">
                                <div>固定侧边栏</div>
                                <div><el-switch v-model="isDark" /></div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-10">
                                <div>灰色模式</div>
                                <div><el-switch v-model="isDark" /></div>
                            </div>
                        </div>
                    </div>
                    <div class="theme-box pt-10">
                        <div class="theme-title">
                            <el-divider content-position="left">页面显示</el-divider>
                        </div>
                        <div class="theme-content">
                            <div class="d-flex justify-content-between align-items-center">
                                <div>多标签栏</div>
                                <div><el-switch v-model="tabview" @change="tabviewChange" /></div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-10">
                                <div>刷新按钮</div>
                                <div><el-switch v-model="refresh" @change="refreshChange" /></div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-10">
                                <div>面包导航</div>
                                <div><el-switch v-model="breadcrumb" @change="breadcrumbChange" /></div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-10">
                                <div>显示底部</div>
                                <div><el-switch v-model="isDark" /></div>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
            <div class="p-10 d-flex justify-content-center align-items-center">
                <el-button type="primary" @click="expSet">导出配置</el-button>
            </div>
        </el-drawer>
    </header>
</template>
<style lang="scss" scoped>
.n-header {
    height: 60px;
    color: v-bind('txtColor');

    // 面包导航
    :deep(.el-breadcrumb__item) {

        .el-breadcrumb__inner {
            color: v-bind('txtColor');
        }
    }

    .profile {
        &>div {
            cursor: pointer;

            &:hover {
                background: v-bind('hsla');
            }

            i {
                font-size: 20px;
            }
        }
    }

    .theme {
        color: var(--el-text-color-primary);

        &-box {
            padding-left: 20px;
            padding-right: 20px;
        }

        &-content {
            .color-item {
                margin-right: 10px;
                margin-bottom: 10px;
                $size: 24px;
                width: $size;
                height: $size;
                border-radius: 4px;
                cursor: pointer;
            }
        }

        .ffbd {
            &:after {
                content: ' ';
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                border-radius: 4px;
                border: solid 1px #000;
            }
        }
    }

    .thumb-layout {
        &>div {
            position: relative;
            width: 52px;
            height: 44px;
            background: #e8e8e8;
            border-radius: 4px;
            margin-right: 10px;

            &:before {
                content: ' ';
                position: absolute;
                top: 0;
                left: 0;
            }

            &:after {
                content: ' ';
                position: absolute;
                top: 0;
                left: 0;
            }
        }

        .thumb-layout-active {
            border-radius: 4px;
            border: solid 2px var(--el-color-primary);
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 9;
        }

        .layout-classic {
            &:before {
                z-index: 1;
                width: 33%;
                height: 100%;
                background-color: #273352;
                border-radius: 4px 0 0 4px;
            }

            &:after {
                width: 100%;
                height: 25%;
                background-color: #bdbdbd;
                border-radius: 4px 4px 0 4px;
            }
        }

        .layout-lefttop {
            &:before {
                width: 33%;
                height: 100%;
                background-color: #bdbdbd;
                border-radius: 4px 0 0 4px;
            }

            &:after {
                z-index: 1;
                width: 100%;
                height: 25%;
                background-color: #273352;
                border-radius: 4px 4px 0 0px;
            }
        }

        .layout-top {
            &:after {
                z-index: 1;
                width: 100%;
                height: 25%;
                background-color: #273352;
                border-radius: 4px 4px 0 0px;
            }
        }

        .layout-cut {
            &-child {
                position: absolute;
                width: 33%;
                height: 100%;
                top: 0;
                left: 10%;
                background-color: #d7d7d7;
            }

            &:before {
                width: 10%;
                height: 100%;
                background-color: #bdbdbd;
                border-radius: 4px 0 0 4px;
            }

            &:after {
                z-index: 1;
                width: 100%;
                height: 25%;
                background-color: #273352;
                border-radius: 4px 4px 0 0px;
            }
        }

    }

}
</style>
<style lang="scss">
.n-header {
    .el-badge {
        width: 20px;
        height: 20px;
    }

    .el-color-picker__trigger {
        width: 24px !important;
        height: 24px !important;
        border: none !important;
        padding: 0px;
        overflow: hidden;
        border-radius: 4px;
    }

    .el-drawer__body {
        padding: 0 !important;
        display: flex;
        flex-direction: column;
    }
}
</style>