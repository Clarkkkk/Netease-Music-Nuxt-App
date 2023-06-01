import Home from './pages/Home/Home.vue'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/radio',
        component: () => import('./pages/Radio/Radio.vue')
    }
]

export default routes
