import { Module, CacheModule, CacheInterceptor } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
// import { GraphQLModule } from '@nestjs/graphql'

import SearchModule from 'src/search'
import DataModule from 'src/data'
import StaticModule from 'src/static'

const ttl = 3600

@Module({
    imports: [
        SearchModule,
        DataModule,
        StaticModule,
        CacheModule.register({
            ttl,
            max: 1024,
        }),
        // GraphQLModule.forRoot()
        // Too lazy to do this, lol
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export default class MainModule {}
