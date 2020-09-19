import { CacheInterceptor, ExecutionContext } from '@nestjs/common'

export default class DynamicCache extends CacheInterceptor {
    trackBy(context: ExecutionContext) {
        const params: any = context.switchToHttp().getRequest().params

        if (params.id === 'favicon.ico') return undefined

        return context.switchToHttp().getRequest().url
    }
}
