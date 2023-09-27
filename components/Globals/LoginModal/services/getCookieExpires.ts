export const getCookieExpires = (cookies: Record<string, string>[]) => {
    const expiresArr = cookies
        .filter((item) => {
            const keys = Object.keys(item)
            return keys.includes('__csrf') || keys.includes('MUSIC_U')
        })
        .map((item) => {
            return new Date(item.Expires).getTime()
        })

    return Math.min(...expiresArr)
}
