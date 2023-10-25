export default {
    apps: [
        {
            name: 'netease-music-nuxt-app',
            port: '3300',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs'
        }
    ]
}
