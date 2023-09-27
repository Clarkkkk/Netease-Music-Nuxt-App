export const parseCookie = (cookie: string) => {
    const arr = cookie
        .split(';')
        .filter((item) => !!item)
        .map((item) => item.trim())
        .map((item) => {
            const [key, value] = item.split('=')
            return [key, value]
        })

    const cookieArr: Array<Record<string, string>> = []
    const attrs = ['Max-Age', 'Expires', 'Path', 'HTTPOnly']
    let index = -1
    arr.forEach((item) => {
        const [key, value] = item
        if (!attrs.includes(key)) {
            index++
        }
        if (cookieArr[index]) {
            cookieArr[index] = {
                ...cookieArr[index],
                [key]: value
            }
        } else {
            cookieArr[index] = {
                [key]: value
            }
        }
    })

    return cookieArr.filter((item) => item.Path === '/')
}
