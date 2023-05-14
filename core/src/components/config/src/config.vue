<script lang="ts" setup>
import { ref } from 'vue'

const msg = ref(1)
</script>
<template>
    <el-config-provider :message="{ max: msg }">
        <slot></slot>
    </el-config-provider>
</template>