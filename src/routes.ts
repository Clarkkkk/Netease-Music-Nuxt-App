import Home from './pages/Home/Home.vue'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/radio',
        component: () => import('./pages/Radio/Radio.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/playing',
        component: () => import('./pages/PlayingNow/PlayingNow.vue')
    },
    {
        path: '/songlist/:id',
        component: () => import('./pages/Songlist/Songlist.vue')
    }
]

export default routes
