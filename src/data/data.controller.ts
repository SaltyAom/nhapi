import {
    Controller,
    Get,
    Param,
    UsePipes,
    UseInterceptors,
    CacheTTL
} from '@nestjs/common'

import ParseSingleParam from '@pipes/parseSingleParam'
import DynamicCache from '@interceptors/dynamicCache'
import EnablePerformanceLogging from '@decorators/enablePerformanceLogging'

import DataService from './data.service'
import IDValidation from './id.pipes'

@Controller('')
export default class AppController {
    constructor(private readonly dataService: DataService) {}

    @Get()
    getIndex() {
        return this.dataService.getIndex()
    }

    @Get(':id')
    @EnablePerformanceLogging()
    @UsePipes(IDValidation)
    @UsePipes(ParseSingleParam)
    @UseInterceptors(DynamicCache)
    @CacheTTL(86400)
    getData(@Param() id) {
        return this.dataService.getData(id)
    }

    @Get(':id/related')
    @EnablePerformanceLogging()
    @UsePipes(ParseSingleParam)
    @UseInterceptors(DynamicCache)
    @CacheTTL(86400)
    getRelated(@Param() id) {
        return this.dataService.getRelate(id)
    }
}
