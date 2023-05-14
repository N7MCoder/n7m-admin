<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
<template>
  <n-config :message="{ max: 1 }">
    <RouterView />
  </n-config>
</template>
