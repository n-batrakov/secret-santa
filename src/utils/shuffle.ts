import seedrandom from 'seedrandom'

export type ShuffleOptions = {
    seed?: string,
}

export function shuffle<T>(source: Array<T>, options?: ShuffleOptions) {
    const opts = options || {}
    const rnd = seedrandom(opts.seed)
    return [...source].sort(() => .5 - rnd())
}
