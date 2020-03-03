import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'

import * as request from 'supertest'

import SearchModule from 'src/search'

describe('AppController (e2e)', () => {
    let app: INestApplication

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [SearchModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    // it('/ (GET)', () => {
    //     return request(app.getHttpServer())
    //         .get('/')
    //         .expect(200)
    //         .expect('Hello World!')
    // })
})
