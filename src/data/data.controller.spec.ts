import { Test } from '@nestjs/testing'
import {
    NestFastifyApplication,
    FastifyAdapter,
} from '@nestjs/platform-fastify'
import { HttpModule, CacheModule, BadRequestException } from '@nestjs/common'

import TagController from './data.controller'
import TagService from './data.service'
import { Observer, Subject } from 'rxjs'

describe('AppController', () => {
    let app: NestFastifyApplication

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [CacheModule.register(), HttpModule],
            controllers: [TagController],
            providers: [TagService],
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
            const appController = app.get<TagController>(TagController)
        })
    })

    afterEach(async () => {
        await app.close()
    })
})
