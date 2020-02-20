import { Test } from '@nestjs/testing'
import {
    NestFastifyApplication,
    FastifyAdapter,
} from '@nestjs/platform-fastify'

import AppController from './app.controller'

import AppService from './app.service'

describe('AppController', () => {
    let app: NestFastifyApplication

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        })
            .compile()

        app = module.createNestApplication<NestFastifyApplication>(
            new FastifyAdapter(),
        )

        await app.init()
        await app
            .getHttpAdapter()
            .getInstance()
            .ready()
    })

    describe('getHello', () => {
        it('should return "Hello World!"', () => {
            const appController = app.get<AppController>(AppController)
            expect(appController.getHello()).toBe('Hello World!')
        })
    })

    afterEach(async () => {
        await app.close()
    })
})
