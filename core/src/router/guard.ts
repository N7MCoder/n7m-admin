import type { Router } from 'vue-router'

const createGuard = (router: Router) => {
    router.beforeEach((to, from, next) => {
        document.title = to.meta.name ? to.meta.name + ' | ' + 'N7M ADMIN' : 'N7M ADMIN'
        if (to.meta.login === false) {
            next()
        } else {
            if (from.path == 'xxx') {
                console.log(from.path);                
            }
            next()
        }
    })
}

export { createGuard }