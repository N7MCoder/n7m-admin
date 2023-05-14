import { createApp } from 'vue'
import App from './App.vue'

import n7m from '@n7m/core'
import '@n7m/core/dist/style.css'
import './assets/style.scss'

const views = import.meta.glob('./views/**/*.vue')

const bootstrap = async (): Promise<void> => {
    const app = createApp(App)

    app.use(n7m, {
        VIEWS: views
    })

    app.mount('#app', true)
}

void bootstrap()

