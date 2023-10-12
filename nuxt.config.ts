import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { fileURLToPath } from 'url'
import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    components: false,
    modules: [
        '@pinia/nuxt',
        'unplugin-icons/nuxt',
        '@nuxtjs/tailwindcss',
        'vue-view-transitions/nuxt'
    ],
    alias: {
        components: fileURLToPath(new URL('./components', import.meta.url)),
        common: fileURLToPath(new URL('./common', import.meta.url)),
        services: fileURLToPath(new URL('./services', import.meta.url)),
        api: fileURLToPath(new URL('./api', import.meta.url)),
        utils: fileURLToPath(new URL('./utils', import.meta.url)),
        stores: fileURLToPath(new URL('./stores', import.meta.url))
    },
    app: {
        baseURL: '/music/'
    },
    imports: {
        autoImport: false
    },
    vite: {
        plugins: [
            svgLoader({
                defaultImport: 'component',
                svgo: false
            }),
            Components({
                dirs: [],
                types: [],
                dts: 'types/components.d.ts',
                resolvers: [IconsResolver()]
            }),
            Icons({})
        ]
    },
    nitro: {
        baseURL: '/music/',
        // proxy the request from client
        devProxy: {
            '/api': {
                target: 'https://api.carllllo.work/music',
                changeOrigin: true,
                headers: {
                    referer: 'https://carllllo.work'
                }
            }
        },
        // redirect the request from server
        routeRules: {
            // '/api/**': {
            //     proxy: 'https://api.carllllo.work/music/**',
            //     headers: {
            //         referer: 'https://carllllo.work'
            //     }
            // }
        }
    },
    experimental: {
        viewTransition: true
    }
})
