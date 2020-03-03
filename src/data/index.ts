import { Module, HttpModule, CacheModule } from '@nestjs/common'

import DataController from './data.controller'
import DataService from './data.service'

@Module({
    imports: [
        CacheModule.register(),
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 2,
        }),
    ],
    controllers: [DataController],
    providers: [DataService],
})
export default class AppMoudle {}
