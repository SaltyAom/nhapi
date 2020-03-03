import { Test } from '@nestjs/testing'
import {
    NestFastifyApplication,
    FastifyAdapter,
} from '@nestjs/platform-fastify'
import { HttpModule, CacheModule } from '@nestjs/common'

import SearchController from './search.controller'
import SearchService from './search.service'

describe('AppController', () => {
    let app: NestFastifyApplication

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [CacheModule.register(), HttpModule],
            controllers: [SearchController],
            providers: [SearchService],
        }).compile()

        app = module.createNestApplication<NestFastifyApplication>(
            new FastifyAdapter(),
        )

        await app.init()
        await app
            .getHttpAdapter()
            .getInstance()
            .ready()
    })

    describe('Get Index', () => {
        it('should return Bad Request Exception', () => {
            const appController = app.get<SearchController>(SearchController)
        })
    })

    afterEach(async () => {
        await app.close()
    })
})
