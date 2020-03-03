import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

export default class Performance implements NestInterceptor {
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
        const enablePerformanceLogging = this.reflector.get<string>(
            'performance',
            context.getHandler(),
        )

        if (!enablePerformanceLogging) return next.handle()

        const now = Date.now()

        return next
            .handle()
            .pipe(
                tap(() =>
                    // tslint:disable-next-line: no-console
                    console.log(
                        `${
                            context.switchToHttp().getRequest().raw.originalUrl
                        } took ${Date.now() - now} ms`,
                    ),
                ),
            )
    }
}
