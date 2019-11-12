import { OutgoingMessageBase } from './types'
import { ajax } from 'rxjs/ajax'
import { mergeMap } from 'rxjs/operators'
import { of, throwError } from 'rxjs'


export type SendMessageRequest = OutgoingMessageBase & {
    channel?: string,
    icon_emoji?: string,
    attachments?: string,
    type?: string,
    props?: any,
}

export function sendMessage(request: SendMessageRequest, options: { mattermostBotUrl: string }) {
    const response$ = ajax({
        url: options.mattermostBotUrl,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: request,
    })

    return response$.pipe(
        mergeMap(x =>
            x.status >= 200 && x.status < 400
            ? of(x.responseText)
            : throwError(`Response status code (${x.status}) does not indicate success`),
        ),
    )
}