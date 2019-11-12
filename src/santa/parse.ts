import { MattermostSlashCommandRequest } from '../mattermost/types'
import { SlashCommandRequest } from './types'

export function parseRequest(request: MattermostSlashCommandRequest): SlashCommandRequest {
    const [command, ...rest] = request.text.split(' ')

    console.log('REQUEST', request)

    return {
        request,
        command,
        text: rest.join(' '),
        username: request.user_name,
        channel: request.channel_id,
    }
}