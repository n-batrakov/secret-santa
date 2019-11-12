import { r } from '@marblejs/core'
import { map, mergeMap } from 'rxjs/operators'
import { combineMiddleware } from '../utils/middleware'
import { sendSantaInvite, becomeSanta, assignPairs, defaultCommand } from './commands'
import { parseRequest } from './parse'
import { AppConfig } from '../config'

export const santaCommandEffect = (config: AppConfig) => r.pipe(
    r.matchPath('/santa'),
    r.matchType('POST'),
    r.useEffect(req$ => req$.pipe(
        map(x => parseRequest(x.body as any)),
        mergeMap(combineMiddleware(
            sendSantaInvite(config),
            becomeSanta(),
            assignPairs(config),
            defaultCommand(),
        )),
        map(body => ({ body })),
    )),
)