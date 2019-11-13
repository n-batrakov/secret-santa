import { getSantaStore, SecretSanta } from '../store'
import { mergeMap, toArray, mapTo, catchError, map } from 'rxjs/operators'
import { sendMessage } from '../../mattermost/api'
import { santaBot } from '../settings'
import { from, of } from 'rxjs'
import { randomPairs } from '../../utils/randomPairs'
import { SlashCommandMiddleware } from '../types'
import { MattermostSlashCommandResponse } from '../../mattermost/types'
import { AppConfig } from '../../config'
import { shuffle } from '../../utils/shuffle'

export const assignPairs = (config: AppConfig): SlashCommandMiddleware => (request, next) => {
    if (request.command !== 'finish') {
        return next(request)
    }

    return getSantaStore()
    .getSantas().pipe(
        map(x => shuffle(x)),
        mergeMap(santas => from(randomPairs(santas, { equalityComparer: santasEqual }))),
        mergeMap(([a, b]) => sendSantaMessage(a, b, config)),
        toArray(),
        mapTo<any, MattermostSlashCommandResponse>({
            ...santaBot,
            text: 'Санты распределены успешно!',
        }),
        catchError(err => of({
            ...santaBot,
            text: `### Ой-ой! Что-то пошло не так!${'\n\n'}\`\`\`${err}\`\`\``,
        })),
    )
}

function santasEqual(a: SecretSanta, b: SecretSanta) {
    return a.username === b.username
}

function sendSantaMessage(target: SecretSanta, receiver: SecretSanta, config: AppConfig) {
    const preferences = receiver.preferences.length === 0
    ? ''
    : `
Вот несколько идей для подарка:
* ${receiver.preferences.join('\n* ')}
`
    const message = {
        ...santaBot,
        channel: `@${target.username}`,
        text: `### Никому не говори


Ты стал тайными сантой для @${receiver.username}.
${preferences}

Удачи в выборе подарка! :vulcan_salute:`,
    }

    return sendMessage(message, config)
}
