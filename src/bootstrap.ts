import { httpListener } from '@marblejs/core'
import { logger$ } from '@marblejs/middleware-logger'
import { bodyParser$, urlEncodedParser, jsonParser } from '@marblejs/middleware-body'
import { santaCommandEffect } from './santa/api'
import { AppConfig } from './config'

export const createHttpListener = (config: AppConfig) => httpListener({
    effects: [
        santaCommandEffect(config),
    ],
    middlewares: [
        logger$(),
        bodyParser$({
            parser: urlEncodedParser,
            type: ['*/x-www-form-urlencoded'],
        }),
        bodyParser$({
            parser: jsonParser,
            type: ['*/json', 'application/vnd.api+json'],
        }),
    ],
})