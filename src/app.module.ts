import { Module, CacheModule, CacheInterceptor } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'

import SearchModule from 'src/search'
import DataModule from 'src/data'
import StaticModule from 'src/static'

const ttl = 60 * 60 * 24

@Module({
    imports: [
        SearchModule,
        DataModule,
        StaticModule,
        CacheModule.register({
            ttl,
            max: 1024,
        })
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export default class MainModule {}
