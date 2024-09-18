import { Controller, Get } from "@nestjs/common";
import { CorrespondenceService } from "./correspondence.service";


@Controller('')
export class CorrespondenceController{
    constructor(private correspondenceService: CorrespondenceService){}

    @Get('/corr')
    async getCorrArtToSpot(){
        return this.correspondenceService.getArtistByArtistName('кино')
    }
}