import { randomPairs } from './ranomPairs'

const range = (n: number) => new Array(n).fill(undefined).map((_, i) => i)

describe('randomPairs', () => {
    it('no random iteration errors', () => {
        for (let i = 0; i < 100000; i++) {
            randomPairs(range(9))
        }
    })

    it('no one assigned to self [even]', () => {
        const source = range(4)

        const actual = randomPairs(source)

        actual.forEach(([a, b]) => {
            expect(a).not.toEqual(b)
        })
    })

    it('no one assigned to self [odd]', () => {
        const source = range(5)

        const actual = randomPairs(source)

        actual.forEach(([a, b]) => {
            expect(a).not.toEqual(b)
        })
    })

    it('everyone gets a pair [even]', () => {
        const source = range(4)

        const actual = randomPairs(source)

        actual.forEach(([a, b]) => {
            expect(a).toBeDefined()
            expect(b).toBeDefined()
        })
    })

    it('everyone gets a pair [odd]', () => {
        const source = range(5)

        const actual = randomPairs(source)

        actual.forEach(([a, b]) => {
            expect(a).toBeDefined()
            expect(b).toBeDefined()
        })
    })

    it('pairs not mirrored', () => {
        const source = range(6)

        const actual = randomPairs(source)

        const mirroredPairs = actual.filter(([a1, b1], i1) =>
            actual.some(([a2, b2], i2) =>
                i1 !== i2 && a2 === a1 && b2 === b1,
            ),
        )

        expect(mirroredPairs.length).not.toEqual(actual.length)
    })
})