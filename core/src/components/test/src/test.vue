<script lang="ts" setup>
import { ref } from 'vue'

const str = ref<string>('hello n7m')
</script>
<template>
    <div>{{ str }}</div>
</template>
<style lang="scss" scoped>
div {
    color: #333;
}
</style>