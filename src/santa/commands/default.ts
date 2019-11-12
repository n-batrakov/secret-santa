import { SlashCommandMiddleware } from '../types'
import { of } from 'rxjs'
import { santaBot } from '../settings'

export const defaultCommand = (): SlashCommandMiddleware => () => {
    return of({
        ...santaBot,
        text: 'Неизвестная команда',
    })
}