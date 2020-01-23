import { Injectable } from "@nestjs/common"

@Injectable()
export default class CatService {
    private readonly cat: string[] = []

    create(cat: string){
        this.cat.push(cat)
    }

    findAll(){
        return this.cat
    }
}