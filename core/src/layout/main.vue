<script lang="ts" setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useUiStore } from '../store/modules/ui'


const uiStore = useUiStore()

const layout = computed(() => uiStore.getLayout)
</script>
<template>
    <section class="n-main-content d-flex flex-column border-top-0">
        <el-scrollbar wrap-class="h-0 flex-fill d-flex" view-class="flex-fill d-flex flex-column">
            <div class="content-box flex-fill" :class="{ 'border-top-0': layout == 'classic' }">
                <router-view />
            </div>
        </el-scrollbar>
    </section>
</template>
<style lang="scss" scoped>
.n-main-content {
    .content-box {
        border: solid 10px var(--el-bg-color-page);
        background: var(--el-bg-color-page);
    }
}
</style>
<style lang="scss">
.n-main-content {
    .el-scrollbar {
        display: flex;
        flex-direction: column;
        height: 0;
        flex: 1 1 auto;
    }
}
</style>