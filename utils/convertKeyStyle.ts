import { camelCase, isObject, snakeCase } from 'lodash'

export function convertKeyStyle(
    obj: Record<string, any> | Array<Record<string, any>>,
    style: 'camel' | 'snake',
    isShallow = false
) {
    if (Array.isArray(obj)) {
        const result = [] as Array<Record<string, any>>
        obj.forEach((item, index) => {
            result[index] = convertKeyStyle(item, style, isShallow)
        })
        return result
    } else {
        const result = {} as Record<string, any>
        for (const [key, val] of Object.entries(obj)) {
            const convertedKey = style === 'snake' ? snakeCase(key) : camelCase(key)
            if (isShallow) {
                result[convertedKey] = val
            } else {
                result[convertedKey] = isObject(val) ? convertKeyStyle(val, style) : val
            }
        }
        return result
    }
}
