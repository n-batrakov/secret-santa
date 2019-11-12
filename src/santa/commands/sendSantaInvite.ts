import { santaBot } from '../settings'
import { sendMessage } from '../../mattermost/api'
import { SlashCommandMiddleware } from '../types'
import { mapTo, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { MattermostSlashCommandResponse } from '../../mattermost/types'
import { AppConfig } from '../../config'

const inviteText = `
### Хочешь стать секретным сантой?

Для этого отправь сообщение

\`\`\`
/santa play <твои пожелания через запятую>
\`\`\`

> *не забудь слэш (/) вначале*

* Пожелания можно не указывать, если не хочешь давать подсказок
* Написать сообщение можно в любой чат, например, самому себе или в ~itexpert_arh
* Сообщение будет видно только тебе, а пожелания увидит только секретный санта

Например,

\`\`\`
/santa play сладости, кофе, носки
\`\`\`

или

\`\`\`
/santa play
\`\`\`

Жеребьевка будет проведена через пару дней, после чего тебе придет личное сообщение с именем коллеги, для которого ты стал тайным сантой.

Вручение подарков будет проводится в конце декабря.
`

export const sendSantaInvite = (config: AppConfig): SlashCommandMiddleware => (request, next) => {
    if (request.command !== 'start') {
        return next(request)
    }

    const message = {
        ...santaBot,
        text: inviteText,
        channel: request.channel,
    }

    return sendMessage(message, config).pipe(
        mapTo<string, MattermostSlashCommandResponse>({
            ...santaBot,
            text: 'Приглашение выслано успешно!',
        }),
        catchError(err => of({
            ...santaBot,
            text: `### Ой-ой! Что-то пошло не так!${'\n\n'}\`\`\`${err}\`\`\``,
        })),
    )
}