import { Observable, throwError } from 'rxjs'

export type Next<A, B> = (context: A) => Observable<B>
export type Middleware<A, B> = (context: A, next: Next<A, B>) => Observable<B>

export function combineMiddleware<A, B>(...middleware: Middleware<A, B>[]) {
    return middleware.reduceRight<Next<A, B>>(
        (prev, next) => {
            return (ctx: A) => next(ctx, prev)
        },
        () => throwError('No middleware handled the request'),
    )
}