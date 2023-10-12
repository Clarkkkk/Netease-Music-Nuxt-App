import { defineEventHandler, proxyRequest } from 'h3'

export default defineEventHandler(async (event) => {
    const requestUrl =
        process.env.NODE_ENV === 'development'
            ? 'https://api.carllllo.work/music'
            : 'http://127.0.0.1:3000'
    const requestPath = event.node.req.url?.replace('/api', '') || ''
    const res = await proxyRequest(event, requestUrl + requestPath, {
        headers: {
            referer: 'https://carllllo.work'
        }
    })

    return res
})
