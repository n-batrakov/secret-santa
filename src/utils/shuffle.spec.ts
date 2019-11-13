import { range } from './range'
import { shuffle } from './shuffle'

const getSource = () => range(15)

describe('shuffle', () => {
    it('arrays must be equal length', () => {
        const source = getSource()
        const actual = shuffle(source)

        expect(actual.length).toEqual(source.length)
    })

    it('all elements must be same', () => {
        const source = getSource()
        const actual = shuffle(source)

        const evertyElementsPresent = actual.every(x => source.includes(x))

        expect(evertyElementsPresent).toBeTruthy()
    })

    it('arrays must not be same', () => {
        const source = getSource()
        const actual = shuffle(source)

        expect(actual).not.toBe(source)
    })

    it('elements must be shuffled', () => {
        const source = getSource()
        const sourceClone = [...source]

        const actual = shuffle(source)

        expect(actual).not.toEqual(sourceClone)
    })

    it('elemnts must not duplicate', () => {
        const source = getSource()
        const actual = shuffle(source)

        const duplicates = actual.filter((x, i) => actual.includes(x, i + 1))

        expect(duplicates.length).toEqual(0)
    })
})