export function minmax(val: number, { min, max }: { min?: number; max?: number }) {
    if (min !== undefined && max !== undefined && min > max) {
        throw new Error('min should be smaller than max')
    }
    let result = val
    if (min !== undefined) {
        result = Math.max(result, min)
    }

    if (max !== undefined) {
        result = Math.min(result, max)
    }

    return result
}
