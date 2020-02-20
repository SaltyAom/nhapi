import { NestFactory } from '@nestjs/core'
import AppModule from 'src/app.module'

import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify'

const bootstrap = async () => {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    )
    await app.listen(3000)
}
bootstrap()
