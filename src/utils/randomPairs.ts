import seedrandom from 'seedrandom'

export type RandomPairsOptions<T> = {
    seed?: string,
    equalityComparer?: (a: T, b: T) => boolean,
}

const defaultComparer = (a: any, b: any) =>  a === b

export function randomPairs<T>(source: T[], options?: RandomPairsOptions<T>): Array<[T, T]> {
    const opts = options || {}

    const pairs = new Array(source.length)
    const rnd = seedrandom(opts.seed)

    const offset = nextInt(rnd, 0, source.length - 1) + 1

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


function pairwise<T>(a: T[], b: T[]) {
    const length = a.length > b.length ? a.length : b.length
    const result = new Array(length)

    for (let i = 0; i < length; i++) {
        result[i] = [a[i], b[i]]
    }

    return result
}

function nextInt(rnd: () => number, from: number, to: number) {
    const n = rnd()
    return Math.floor(scale(n, 0, 1, from, to))
}

function scale(x: number, x0: number, x1: number, y0: number, y1: number) {
    return y0 + (y1 - y0) * (x - x0) / (x1 - x0)
}

function validatePairs<T>(pairs: Array<[T, T]>, eq: (a: T, b: T) => boolean) {
    return pairs.every(([a, b]) => !eq(a, b))
}