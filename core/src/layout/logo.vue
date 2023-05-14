<script lang="ts" setup>
import { computed } from 'vue'
import { useUiStore } from '../store/modules/ui'
import { textColor4grayLevel } from '../util/color'
import type { navTextColor } from '../types/ui'

const uiStore = useUiStore()

// --- 折叠 -------------------------------
const collapseAble = computed((): boolean => {
    const layout = uiStore.getLayout
    let able: boolean = false
    if (layout == 'classic') {
        able = true
    }
    return able
})
const collapse = computed(() => uiStore.getCollapse)

const background = computed<string>((): string => {        
    const drak = uiStore.getDark
    if (drak) {
        return 'var(--el-bg-color)'
    } else {
        const layout = uiStore.getLayout
        if (layout == 'classic') {
            return uiStore.getNavBgColor
        } else {
            return 'var(--el-color-primary)'
        }
    }
})

const txtColor = computed<navTextColor>((): navTextColor => {
    const drak = uiStore.getDark
    if (drak) {
        return '#E5EAF3'
    } else {
        const layout = uiStore.getLayout
        if (layout == 'classic') {
            return textColor4grayLevel(uiStore.getNavBgColor)
        } else {
            return '#E5EAF3'
        }
    }
})


</script>
<template>
    <div class="n-logo d-flex align-items-center" :style="{ background: background }">
        <div class="n-logo-img d-flex align-items-center">
            <svg width="32" height="32">
                <polyline points="0,0 32,0" stroke-width="3" stroke="#67c23a" fill="none" />
                <polyline points="32,0 32,32" stroke-width="3" stroke="#e6a23c" fill="none" />
                <polyline points="32,32 0,32" stroke-width="3" stroke="#f56c6c" fill="none" />
                <polyline points="0,32 0,0" stroke-width="3" stroke="#409eff" fill="none" />
                <text font-size="24" x="6" y="24" stroke-width="0" fill="currentColor">N</text>
            </svg>
        </div>
        <h1 :style="{ display: collapseAble && collapse ? 'none' : 'block' }">N7M ADMIN</h1>
    </div>
</template>
<style lang="scss" scoped>
.n-logo {
    color: v-bind('txtColor');
    font-size: 24px;
    height: 60px;
    padding-left: 16px;

    .n-logo-img {
        width: 32px;
        height: 32px;
    }

    h1 {
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 0 8px;
        white-space: nowrap;
    }
}
</style>