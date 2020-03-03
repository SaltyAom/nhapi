import {
    ExceptionFilter,
    Catch,
    NotFoundException,
    ArgumentsHost,
} from '@nestjs/common'

import { resolve } from 'path'
import { createReadStream } from 'fs'

@Catch(NotFoundException)
export default class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()

        const stream = createReadStream(resolve('public/html/404.html'))
        response.type('text/html').send(stream)
    }
}
