import { resolve } from 'path'
import type { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import dts from 'vite-plugin-dts'
import { mock } from './build/vite/plugin'

export default ({ command }: ConfigEnv): UserConfigExport => {
    return {
        build: {
            lib: {
                entry: resolve(__dirname, 'src/index.ts'),
                name: 'index',
                fileName: 'index',
            },
            rollupOptions: {
                external: [
                    'fsevents'
                ]
            }
        },
        server: {
            host: true,
            port: 8080
        },
        plugins: [
            dts(),
            viteMockServe({
                // default
                mockPath: 'src/api',
                localEnabled: true,
            })
        ]
    }
}