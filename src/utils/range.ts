export function range(length: number) {
    return new Array(length).fill(undefined).map((_, i) => i)
}