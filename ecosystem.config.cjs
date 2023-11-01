module.exports = {
    apps: [
        {
            name: 'netease-music-nuxt-app',
            port: '3300',
            exec_mode: 'cluster',
            instances: 'max',
            script: './server/index.mjs'
        }
    ]
}
