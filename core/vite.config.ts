import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    vue(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'n7m',
      fileName: 'index',
      formats: ['es']
    },
    outDir: 'dist',
    rollupOptions: {
      external: [
        '@element-plus/icons-vue',
        'echarts/core',
        'echarts/components',
        'echarts/charts',
        'echarts/features',
        'echarts/renderers',
        'element-plus',
        'pinia',
        'vue',
        'vue-router',
        'web-storage-cache'
      ],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
