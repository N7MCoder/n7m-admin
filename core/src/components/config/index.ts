import type { App } from 'vue'

import Config from './src/config.vue'

Config.install = (app: App) => {
    app.component('n-' + Config.__name!, Config)
    return app
}

export default Config