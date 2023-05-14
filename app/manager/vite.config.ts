import { fileURLToPath, URL } from 'node:url'

import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 获取当前目录(vite.config.ts所在)
  const root = process.cwd()
  // 加载模式对应的环境配置文件
  const env = loadEnv(mode, root)
  // 包装变量 例如将 'true' 转为 true 等
  const viteEnv = wrapperEnv(env)
  // 解构环境变量
  const { VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_PORT, VITE_GLOB_PROD_MOCK, VITE_PROXY } = viteEnv
  // Mock开关变量
  const prodMock = VITE_GLOB_PROD_MOCK
  // 是否为构建命令
  const isBuild = command === 'build'
  return {
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url))
        },
        {
          find: '/\/#\//',
          replacement: fileURLToPath(new URL('./types', import.meta.url))
        }
      ]
    },
    server: {
      // 设置为 0.0.0.0 或者 true 将监听所有地址
      host: true,
      // 默认端口 5173
      port: VITE_PORT,
      // 开发服务器代理接口(用于访问mock之类的)
      proxy: createProxy(VITE_PROXY)
    },
    plugins: [
      vue(),
      // setupMockPlugin(isBuild, prodMock)
    ]
  }
}
