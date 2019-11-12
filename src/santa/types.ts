import { Middleware } from '../utils/middleware'
import { MattermostSlashCommandRequest, MattermostSlashCommandResponse } from '../mattermost/types'

export type SlashCommandRequest = {
    request: MattermostSlashCommandRequest,
    command: string,
    text: string,
    channel: string,
    username: string,
}

export type SlashCommandMiddleware = Middleware<SlashCommandRequest, MattermostSlashCommandResponse>