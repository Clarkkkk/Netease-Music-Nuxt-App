import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
// import checker from 'vite-plugin-checker'
import { VitePWA } from 'vite-plugin-pwa'
import svgLoader from 'vite-svg-loader'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        envDir: './env',
        // logLevel: 'warn',
        plugins: [
            vue(),
            // checker({
            //     vueTsc: true,
            //     overlay: {
            //         initialIsOpen: false
            //     }
            // }),
            svgLoader({
                defaultImport: 'component',
                svgo: false
            }),
            tsconfigPaths({
                loose: true
            }),
            Icons(),
            Components({
                dts: 'src/types/components.d.ts',
                resolvers: [
                    IconsResolver()
                ]
            }),
            VitePWA({
                registerType: 'autoUpdate',
                manifest: {
                    name: 'Netease Music',
                    short_name: 'Netease Music',
                    description: 'Netease Music',
                    theme_color: '#ff3932',
                    start_url: 'index.html',
                    scope: '/'
                },
                workbox: {
                    skipWaiting: true,
                    clientsClaim: true,
                    globPatterns: ['**/{main,vendor}.*.{js,css}'],
                    globIgnores: ['**/*.html', '**/*.webmanifest'],
                    maximumFileSizeToCacheInBytes: 2000 * 1000,
                    sourcemap: false,
                    navigateFallback: undefined,
                    cleanupOutdatedCaches: true,
                    runtimeCaching: [
                        {
                            urlPattern: '^https://carllllo.work/music.*\\.(js|css)$',
                            handler: 'CacheFirst',
                            options: {
                                cacheName: 'app-shell',
                                cacheableResponse: {
                                    statuses: [200]
                                },
                                expiration: {
                                    maxAgeSeconds: 30 * 24 * 60 * 60
                                }
                            }
                        },
                        {
                            urlPattern: /\.(?:png|gif|jpg|jpeg|webp|svg)$/i,
                            handler: 'CacheFirst',
                            options: {
                                cacheName: 'app-images',
                                cacheableResponse: {
                                    statuses: [200]
                                },
                                expiration: {
                                    maxAgeSeconds: 60 * 24 * 60 * 60,
                                    maxEntries: 100
                                }
                            }
                        }
                    ]
                }
            })
        ],
        server: {
            port: 3200,
            open: 'http://dev.carllllo.work:3200/music',
            proxy: {
                '/api': {
                    target: 'https://api.carllllo.work/music',
                    changeOrigin: true,
                    rewrite: (url) => url.replace(/^\/api/, '')
                }
            }
        },
        build: {
            outDir: 'dist',
            chunkSizeWarningLimit: 1024,
            rollupOptions: {
                output: {
                    entryFileNames: path.posix.join('assets', 'main.[hash].js'),
                    chunkFileNames: (info) => {
                        const name = /index\.tsx?$/.test(info.facadeModuleId)
                            ? info.facadeModuleId.match(/([^/]+)(\/index\.tsx?$)/)[1]
                            : '[name]'
                        return path.posix.join('assets', `${name}.[hash].js`)
                    }
                }
            }
        },
        preview: {
            port: 6400
        }
    }
})
