export type OutgoingMessageBase = {
    text?: string,
    username?: string,
    icon_url?: string,
}

export type MattermostSlashCommandRequest = {
    channel_id: string,
    channel_name: string,
    command: string,
    response_url: string,
    team_domain: string,
    team_id: string,
    text: string,
    token: string,
    trigger_id: string,
    user_id: string,
    user_name: string,
}

export type MattermostSlashCommandResponse = OutgoingMessageBase & {
    response_type?: 'ephemeral' | 'in_channel',
    channel_id?: string,
    goto_location?: string,
    attachments?: string,
    type?: string,
    extra_responses?: string[],
    props?: any,
}
