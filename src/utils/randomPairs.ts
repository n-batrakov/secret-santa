import seedrandom from 'seedrandom'
import { randomInt } from './randomInt'
import { pairwise } from './pairwise'

export type RandomPairsOptions<T> = {
    seed?: string,
    equalityComparer?: (a: T, b: T) => boolean,
}

const defaultComparer = (a: any, b: any) =>  a === b

export function randomPairs<T>(source: T[], options?: RandomPairsOptions<T>): Array<[T, T]> {
    const opts = options || {}

    const pairs = new Array(source.length)
    const rnd = seedrandom(opts.seed)

    const offset = randomInt(rnd, 0, source.length - 1) + 1

    for (let i = 0; i < pairs.length; i++) {
        const idx = (i  + offset) % source.length
        pairs[i] = source[idx]
    }

    const result = pairwise(source, pairs)
    if (validatePairs(result, opts.equalityComparer || defaultComparer)) {
        return result
    } else {
        throw new Error('Self-paired elements found.')
    }
}

function validatePairs<T>(pairs: Array<[T, T]>, eq: (a: T, b: T) => boolean) {
    return pairs.every(([a, b]) => !eq(a, b))
}