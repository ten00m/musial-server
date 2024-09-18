import { Controller, Get, Query } from "@nestjs/common";
import { SpotifyApiService } from "./spotifyApi.service";


@Controller('/spot-api')
export class SpotifyApiController{
    constructor(private spotifyApiService: SpotifyApiService){
        this.spotifyApiService.init()
    }


    @Get('/test')
    async test(){
        return this.spotifyApiService.testApi()
    }
}