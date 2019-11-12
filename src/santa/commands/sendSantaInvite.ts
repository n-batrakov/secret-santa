import { santaBot } from '../settings'
import { sendMessage } from '../../mattermost/api'
import { SlashCommandMiddleware } from '../types'
import { mapTo, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { MattermostSlashCommandResponse } from '../../mattermost/types'
import { AppConfig } from '../../config'

const inviteText = `
### Хочешь стать секретным сантой?

Порадуй своих коллег подарками и порадуйся подарку коллеги сам!

Для этого в любой канал Mattermost отправь сообщение \`/santa <ваши интересы через запятую>\` или просто \`/santa\`, если не хочешь давать подсказок.

Не волнуйся, сообщение увидишь только ты :slightly_smiling_face:

Например,

\`\`\`
/santa сладости, кофе, носки
\`\`\`

В определенную дату будет проведена жеребьевка и твой получатель будет указан в секретном сообщении.
`

export const sendSantaInvite = (config: AppConfig): SlashCommandMiddleware => (request, next) => {
    if (request.command !== 'start') {
        return next(request)
    }

    const message = {
        ...santaBot,
        text: inviteText,
        channel: '@n.batrakov',
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