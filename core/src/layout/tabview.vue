<script lang="ts" setup>
import { onMounted, ref, watch, computed } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { useRouter } from 'vue-router'
import { useUiStore } from '../store/modules/ui'

const uiStore = useUiStore()

const defaultPath = '/dashboard'

const router = useRouter()

const active = ref(defaultPath)
watch(() => active.value, (val) => {
    let waitRoute = list.value.find(v => v.fullPath === val)
    if (waitRoute && (waitRoute.fullPath !== router.currentRoute.value.fullPath)) {
        router.push({
            path: waitRoute.fullPath
        })
    }
})


const list = ref<Pick<RouteLocationNormalizedLoaded, 'path' | 'fullPath' | 'meta'>[]>([])

watch(() => router.currentRoute.value, (to) => {
    if (list.value.findIndex(v => v.fullPath == to.fullPath) < 0) {
        let clone = Object.assign({}, to)
        list.value = [...list.value, clone]
    }
    active.value = to.fullPath
}, { immediate: true, deep: true })

onMounted(() => {
    if (router.currentRoute.value.fullPath != defaultPath) {
        addIndexToFirst()
    }
    window.addEventListener('contextmenu', event => setPosition(event))
})

const addIndexToFirst = () => {
    let first: Pick<RouteLocationNormalizedLoaded, 'path' | 'fullPath' | 'meta'> = {
        path: defaultPath,
        fullPath: defaultPath,
        meta: {
            name: '控制台'
        }
    }
    list.value.splice(0, 0, first)
}

const context = ref(false)
const pos = ref({
    top: 0,
    left: 0
})
const contextMenu = (event: any, path: string): void => {
    event.preventDefault();

    console.log(path);


    if (![...event.target.classList].includes('tabs-menu')) {
        return;
    }
    if (!context.value) {
        context.value = true
    }
}
const setPosition = (event) => {
    if (![...event.target.classList].includes('tabs-menu')) {
        return;
    }
    pos.value.top = event.clientY - event.offsetY + (event.target.clientHeight / 2)
    pos.value.left = event.clientX - event.offsetX + (event.target.clientWidth / 2)
}
const outClick = (): void => {
    context.value = false
}
const remove = (): void => {

}
const contextClick = (index: string): void => {
    switch (index) {
        case '0':
            break;
        case '1':
            break;
        case '2':
            break;
        case '3':
            break;
    }
    context.value = false
}

const layout = computed(() => uiStore.getLayout)

</script>
<template>
    <nav class="n-layout-tabs" :class="{ 'classic': layout == 'classic', 'topleft': layout == 'left' }">
        <el-tabs v-model="active">
            <el-tab-pane v-for="(item) in list" :name="item.fullPath">
                <template v-slot:label>
                    <div class="d-flex">
                        <div class="position-relative tabs-menu" v-on:contextmenu="event => contextMenu(event, item.fullPath)">
                            {{ item.meta.name }}
                            <div class="remove" v-if="item.fullPath != defaultPath">
                                <el-icon @click.stop="remove()">
                                    <close />
                                </el-icon>
                            </div>
                        </div>
                    </div>
                </template>
            </el-tab-pane>
        </el-tabs>
        <div class="context-menu" v-if="context" :style="{ top: pos.top + 'px', left: pos.left + 'px' }" v-click-outside="outClick">
            <el-menu @select="contextClick">
                <el-menu-item index="0">
                    <el-icon>
                        <refresh-right />
                    </el-icon>
                    <template #title>刷新</template>
                </el-menu-item>
                <el-menu-item index="1">
                    <el-icon>
                        <back />
                    </el-icon>
                    <template #title>关闭左侧</template>
                </el-menu-item>
                <el-menu-item index="2">
                    <el-icon>
                        <right />
                    </el-icon>
                    <template #title>关闭右侧</template>
                </el-menu-item>
                <el-menu-item index="3">
                    <el-icon>
                        <close />
                    </el-icon>
                    <template #title>关闭其他</template>
                </el-menu-item>
            </el-menu>
        </div>
    </nav>
</template>
<style lang="scss">
.n-layout-tabs {
    flex: 0 0 50px;

    // 移除容器边框
    .el-tabs__nav-wrap {
        &:after {
            background-color: transparent !important;
        }
    }

    // 移除底部边距
    .el-tabs__header {
        margin: 0 !important;
    }

    .remove {
        $size: 16px;
        $color: #999;
        padding-left: 3px;

        i {
            width: $size;
            height: $size;
            color: $color;

            &:hover {
                color: $color;
            }
        }
    }

    &.classic {
        background: var(--el-bg-color-page);
        display: flex;
        align-items: center;

        .el-tabs__header {
            padding: 0 10px !important;
        }

        .el-tabs__active-bar {
            display: none;
        }

        $tab-height: 32px !important;

        .el-tabs__item {
            height: $tab-height;
            line-height: $tab-height;
            padding: 0 5px;

            &:nth-child(2) {
                padding-left: 0 !important;
            }
        }

        .el-tabs__nav-next,
        .el-tabs__nav-prev {
            line-height: $tab-height;
        }

        .tabs-menu {
            display: flex;
            align-items: center;
            padding: 0 10px;
            background: var(--el-bg-color-overlay);
            border-radius: 4px;
        }

        .remove {
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
        }
    }

    &.topleft {
        background: var(--el-bg-color-overlay);
        border-left: 1px solid var(--el-bg-color-page);
        border-bottom: 1px solid var(--el-bg-color-page);

        .el-tabs__header {
            padding: 0 20px !important;
        }

        $tab-height: 50px !important;

        .el-tabs__item {
            height: $tab-height;
            line-height: $tab-height;
        }

        .el-tabs__nav-next,
        .el-tabs__nav-prev {
            line-height: $tab-height;
        }

        .el-tabs__item {
            &:hover {
                .remove {
                    display: block;
                }
            }
        }

        .remove {
            display: none;
            padding-left: 3px;
            position: absolute;
            top: 2px;
            right: -(16px + 2px);
        }
    }

    .context-menu {
        z-index: 999;
        position: fixed;
        box-shadow: 1px 0px 20px rgb(0 0 0 / 5%) !important;
        border-radius: 4px;
        overflow: hidden;
        border: solid 1px #eee;

        $height: 40px !important;

        .el-menu-item {
            height: $height;
            line-height: $height;
            padding: 0 15px !important;

            &.is-active {
                &:after {
                    width: 0px !important;
                }
            }
        }
    }

}
</style>