import { Module } from '@nestjs/common'

import AppController from '@controllers/app'
import CatController from '@controllers/cat'

import AppService from '@services/app'
import CatService from '@services/cat'

@Module({
    imports: [],
    controllers: [AppController, CatController],
    providers: [AppService, CatService],
})
export default class AppModule {}
