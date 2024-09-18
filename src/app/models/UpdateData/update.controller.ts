import { Controller, Get } from "@nestjs/common";
import { UpdateDataService } from "./update.service";


@Controller('/update')
export class UpdateDataController {

    constructor(private updateDataService: UpdateDataService){}

    // @Get('/spotId')
    // async updateSpotId(){
    //     this.updateDataService.updateSpotId()
    // }

    // @Get('/updateArtists')
    // async updateArtists(){
    //     this.updateDataService.updateArtists()
    // }
}