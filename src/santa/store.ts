import { promises as fs } from 'fs'
import path from 'path'
import { from, Observable } from 'rxjs'
import { notNullOrUndefined } from '../utils'
const baseDir = './data'

export type SecretSanta = {
    username: string,
    preferences: string[],
}

function writeSanta(santa: SecretSanta) {
    const filename = `${santa.username}.json`
    const content = JSON.stringify(santa)

    const promise = fs
    .writeFile(path.join(baseDir, filename), content, 'utf8')
    .then(() => santa)

    return from(promise)
}

function getSantas(): Observable<SecretSanta[]> {
    const promise = fs.readdir(baseDir)
    .then(files => files.map((filepath) => {
        if (path.extname(filepath) !== '.json') {
            return Promise.resolve(undefined)
        }

        return fs
        .readFile(path.join(baseDir, filepath), 'utf-8')
        .then(x => JSON.parse(x) as SecretSanta)
    }))
    .then(x => Promise.all(x))
    .then(x => x.filter(notNullOrUndefined))

    return from(promise)
}

export function getSantaStore() {
    return { writeSanta, getSantas }
}