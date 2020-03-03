import { Controller, Get, Res } from '@nestjs/common'

import StaticService from './static.service'

@Controller()
export default class StaticController {
    constructor(private readonly staticService: StaticService) {}

    @Get('/src/what.jpg')
    getTunaImage(@Res() res) {
        return this.staticService.getTunaImage(res)
    }
}
