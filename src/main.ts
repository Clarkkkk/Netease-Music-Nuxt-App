import { createApp, nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { startViewTransition, ViewTransitionsPlugin } from 'vue-view-transitions'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/useAuthStore'
import { wait } from './utils/wait'
import App from './App.vue'
import routes from './routes'
import './global.css'

const router = createRouter({
    history: createWebHistory('/music'),
    routes
})
router.beforeEach((to, from) => {
    if (to.path === '/index.html') {
        return '/'
    }

    const auth = useAuthStore()
    if (to.meta.requiresAuth && !auth.loggedIn) {
        auth.openLogin()
        if (from.meta.requiresAuth || from.matched.length === 0) {
            return '/'
        } else {
            return false
        }
    } else {
        return true
    }
})

let promise = Promise.resolve()

router.beforeResolve(async () => {
    console.log('beforeResolve')
    promise = new Promise((resolve) => {
        router.afterEach(() => {
            console.log('afterEach: ', Date.now())
            resolve()
        })
    })
    const viewTransition = startViewTransition(async () => {
        await promise
        console.log('startViewTransition: ', Date.now())
    })
    console.log(viewTransition)
    await viewTransition.captured
    console.log('beforeResolve end: ', Date.now())
})

createApp(App).use(router).use(createPinia()).use(ViewTransitionsPlugin()).mount('#app')
