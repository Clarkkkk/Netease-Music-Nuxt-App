import { describe, expect, test } from 'vitest'
import { minmax } from '../minmax'

describe('minmax', () => {
    test('negative', () => {
        expect(minmax(-0.5, { min: 0, max: 1 })).toMatchInlineSnapshot('0')
    })

    test('positive', () => {
        expect(minmax(1.5, { min: 0, max: 1 })).toMatchInlineSnapshot('1')
    })

    test('normal', () => {
        expect(minmax(0.5, { min: 0, max: 1 })).toMatchInlineSnapshot('0.5')
    })
})
