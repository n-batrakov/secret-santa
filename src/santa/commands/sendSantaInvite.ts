import { santaBot } from '../settings'
import { sendMessage } from '../../mattermost/api'
import { SlashCommandMiddleware } from '../types'
import { mapTo, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { MattermostSlashCommandResponse } from '../../mattermost/types'
import { AppConfig } from '../../config'

const inviteText = `
### Хочешь стать секретным сантой?

Порадуй своих коллег подарками!

Для этого в ~itexpert_arh (или любой другой канал Mattermost) отправь сообщение \`/santa play <ваши интересы через запятую>\` или просто \`/santa play\`, если не хочешь давать подсказок.

Например,

\`\`\`
/santa play сладости, кофе, носки
\`\`\`

Не волнуйся, сообщение увидишь только ты, а твои пожелания только секретный санта :slightly_smiling_face:

До конца ноября будет проведена жеребьевка и твой получатель будет указан в секретном сообщении.

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