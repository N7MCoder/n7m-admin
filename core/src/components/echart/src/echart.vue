<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import { GridComponent, TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { LineChart, PieChart } from 'echarts/charts'
import { UniversalTransition, LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    PieChart,
    LabelLayout,
    CanvasRenderer,
    UniversalTransition
])

const dom = ref(null)
let instance: echarts.ECharts

const props = withDefaults(defineProps<{
    modelValue?: any
}>(), {})

onMounted(() => {
    if (dom.value) {
        let el = (dom.value as HTMLElement).querySelector('.n-echarts-box')
        instance = echarts.init((el as HTMLElement))
        if (props.modelValue) {
            instance.setOption(props.modelValue)
        }
        window.addEventListener('resize', () => {
            instance.resize()
        })
    }
})

onUnmounted(() => {
    instance.dispose()
})

</script>
<template>
    <div ref="dom" class="n-echarts">
        <div class="n-echarts-box w-100 h-100"></div>
    </div>
</template>
<style lang="scss" scoped>
.n-echarts {
    width: 100%;
    height: 100%;
}
</style>