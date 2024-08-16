import { Controller, Get } from "@nestjs/common";
import { UpdateDataService } from "./update.service";


@Controller('/update')
export class UpdateDataController {

    constructor(private updateDataService: UpdateDataService){}

    @Get('/')
    async update(){
        this.updateDataService.update()
    }
}