import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
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

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
