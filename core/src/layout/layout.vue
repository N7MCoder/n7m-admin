<script lang="ts" setup>
import { computed } from 'vue'
import NHeader from './header.vue'
import NMenu from './menu.vue'
import NLogo from './logo.vue'
import NMain from './main.vue'
import NTabview from './tabview.vue'
import { useUiStore } from '../store/modules/ui'

const uiStore = useUiStore()

const layout = computed(() => uiStore.getLayout)

const tabview = computed(() => uiStore.getTabview)

const collapse = computed(() => uiStore.getCollapse)

</script>
<template>
    <section class="n-layout d-flex" :class="{ 'flex-column': layout != 'classic' }">
        <template v-if="layout == 'classic'">
            <aside :style="{ width: collapse ? '64px' : '200px' }" class="aside d-flex flex-column">
                <n-logo />
                <div class="h-0 flex-fill">
                    <n-menu />
                </div>
            </aside>
            <main class="w-0 flex-fill d-flex flex-column">
                <n-header />
                <n-tabview v-if="tabview" />
                <n-main class="flex-fill h-0" />
            </main>
        </template>
        <template v-if="layout == 'left'">
            <div class="d-flex">
                <n-logo style="width: 200px"></n-logo>
                <div class="flex-fill">
                    <n-header />
                </div>
            </div>
            <section class="d-flex flex-fill h-0">
                <aside :style="{ width: collapse ? '64px' : '200px' }" class="aside">
                    <n-menu />
                </aside>
                <main class="w-0 flex-fill d-flex flex-column">
                    <n-tabview v-if="tabview" />
                    <n-main class="flex-fill h-0" />
                </main>
            </section>
        </template>
    </section>
</template>
<style lang="scss" scoped>
.n-layout {
    width: 100vw;
    height: 100vh;

    .aside {
        overflow-x: hidden;
        position: relative;
        transition: all 0.2s;
    }
}
</style>
<style lang="scss">
.el-header,
.el-main {
    padding: 0 !important;
}
</style>