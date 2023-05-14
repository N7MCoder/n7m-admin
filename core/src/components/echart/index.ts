import type { App } from 'vue'

import Echart from './src/echart.vue'

Echart.install = (app: App) => {
    app.component('n-' + Echart.__name!, Echart)
    return app
}

export default Echart