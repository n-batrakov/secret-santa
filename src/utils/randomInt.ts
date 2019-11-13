export function randomInt(rnd: () => number, from: number, to: number) {
    const n = rnd()
    return Math.floor(scale(n, 0, 1, from, to))
}

function scale(x: number, x0: number, x1: number, y0: number, y1: number) {
    return y0 + (y1 - y0) * (x - x0) / (x1 - x0)
}