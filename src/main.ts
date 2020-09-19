import { NestFactory, Reflector } from '@nestjs/core'

import AppModule from 'src/app.module'
import NotFoundExceptionFilter from 'src/filters/NotFoundException'

import compression from 'fastify-compress'

import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify'

const bootstrap = async () => {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    )
    app.register(compression)
    // app.useGlobalInterceptors(new Performance(app.get(Reflector)))
    app.useGlobalFilters(new NotFoundExceptionFilter())
    await app.listen(3000)
}
bootstrap()
