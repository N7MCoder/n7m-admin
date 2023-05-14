import type { App } from 'vue'

import Layout from './src/layout.vue'

Layout.install = (app: App) => {
    app.component('n-' + Layout.__name!, Layout)
    return app
}

export default Layout