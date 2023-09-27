import { fileURLToPath } from 'url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    components: [{ path: '~/components/globals', pathPrefix: false }, '~/components'],
    modules: ['@pinia/nuxt', 'unplugin-icons/nuxt'],
    alias: {
        common: fileURLToPath(new URL('./common', import.meta.url)),
        services: fileURLToPath(new URL('./services', import.meta.url)),
        api: fileURLToPath(new URL('./api', import.meta.url)),
        utils: fileURLToPath(new URL('./utils', import.meta.url)),
        stores: fileURLToPath(new URL('./stores', import.meta.url))
    }
})
