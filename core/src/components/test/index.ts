import type { App } from 'vue'

import Test from './src/test.vue'

Test.install = (app: App) => {        
    app.component('n-' + Test.__name!, Test)
    return app
}

export default Test