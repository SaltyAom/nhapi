import { Injectable } from '@nestjs/common'

import { resolve } from 'path'
import { createReadStream } from 'fs'

@Injectable()
export default class StaticService {
    getTunaImage(res) {
        const stream = createReadStream(resolve('public/src/what.jpg'))
        return res.type('image/jpg').send(stream)
    }
}
