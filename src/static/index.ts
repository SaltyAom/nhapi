import { Module } from '@nestjs/common'

import StaticController from './static.controller'
import StaticService from './static.service'

@Module({
    controllers: [StaticController],
    providers: [StaticService],
})
export default class StaticModule {}
