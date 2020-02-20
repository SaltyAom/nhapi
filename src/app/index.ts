import { Module } from '@nestjs/common'

import FileService from '@services/file'
import AppController from './app.controller'
import AppService from './app.service'

@Module({
    controllers: [AppController],
    providers: [AppService, FileService],
})
export default class AppMoudle {}
