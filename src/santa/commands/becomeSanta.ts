import { MattermostSlashCommandResponse } from '../../mattermost/types'
import { santaBot } from '../settings'
import { of } from 'rxjs'
import { getSantaStore } from '../store'
import { map, catchError } from 'rxjs/operators'
import { SlashCommandMiddleware } from '../types'

const successResponse: MattermostSlashCommandResponse = {
    ...santaBot,
    text: `### Ты стал тайным сантой :snowman:

Вскоре тебе будет назначен получатель подарка.
Только никому не говори, кто тебе выпадет.
Даже мы не знаем, кто это будет.`,
}

const errorResponse: MattermostSlashCommandResponse = {
    ...santaBot,
    text: `### Ой-ой! Что-то пошло не так!

    Попытайся еще раз и сообщи об этом @n.batrakov.`,
}

export const becomeSanta = (): SlashCommandMiddleware => (request, next) => {
    if (request.command !== 'play') {
        return next(request)
    }

    const username = request.username
    const preferences = request.text.split(',').map(x => x.trim()).filter(x => x.length > 0)

    return getSantaStore()
    .writeSanta({ username, preferences })
    .pipe(
        map(() => successResponse),
        catchError((e) => {
            console.error(e)
            return of(errorResponse)
        }),
    )
}