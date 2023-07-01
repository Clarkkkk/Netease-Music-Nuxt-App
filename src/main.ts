import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { startViewTransition, ViewTransitionsPlugin } from 'vue-view-transitions'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/useAuthStore'
import App from './App.vue'
import routes from './routes'
import './global.css'

const router = createRouter({
    history: createWebHistory('/music'),
    routes
})
router.beforeEach((to, from) => {
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

router.beforeResolve(async () => {
    await startViewTransition()
})

createApp(App).use(router).use(createPinia()).use(ViewTransitionsPlugin()).mount('#app')
