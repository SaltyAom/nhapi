import { Module, HttpModule, CacheModule } from '@nestjs/common'

import SearchController from './search.controller'
import SearchService from './search.service'

@Module({
    imports: [
        CacheModule.register(),
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 2,
        }),
    ],
    controllers: [SearchController],
    providers: [SearchService],
})
export default class AppMoudle {}
