export function pairwise<T>(a: T[], b: T[]) {
    const length = a.length > b.length ? a.length : b.length
    const result = new Array(length)

    for (let i = 0; i < length; i++) {
        result[i] = [a[i], b[i]]
    }

    return result
}