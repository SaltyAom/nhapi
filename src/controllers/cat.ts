import { Get, Param, Controller } from "@nestjs/common"
import CatService from "../services/cat"

@Controller("cat")
export default class CatController {
    constructor(private readonly catService: CatService){}

    @Get()
    displayCat(): string[] {
        return this.catService.findAll()
    }

    @Get("add/:cat")
    addCat(@Param() { cat }){
        this.catService.create(cat)
        return `${cat} is added!`
    }
}