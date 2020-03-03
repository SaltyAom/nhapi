import { Controller, Get, Param, UsePipes, UseInterceptors } from '@nestjs/common'

import ParseSingleParam from '@pipes/parseSingleParam'
import DynamicCache from '@interceptors/dynamicCache'
import EnablePerformanceLogging from '@decorators/enablePerformanceLogging'

import SearchService from './search.service'

@Controller('/search')
export default class AppController {
    constructor(private readonly searchService: SearchService) {}

    @Get()
    getHello() {
        return this.searchService.getHello()
    }

    @Get(':search')
    @EnablePerformanceLogging()
    @UsePipes(ParseSingleParam)
    @UseInterceptors(DynamicCache)
    getTag(@Param() search) {
        return this.searchService.getSearch(search)
    }

    @Get(':search/:page')
    @EnablePerformanceLogging()
    @UseInterceptors(DynamicCache)
    getTagAndPage(@Param() { search, page }) {
        return this.searchService.getSearch(search, page)
    }
}
