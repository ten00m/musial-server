import { Controller, Get, Query } from "@nestjs/common";
import { SpotifyApiService } from "./spotifyApi.service";


@Controller('/spot-api')
export class SpotifyApiController{
    constructor(private spotifyApiService: SpotifyApiService){}


    @Get('/test')
    async test(){
        return this.spotifyApiService.testApi()
    }

    @Get('/artists')
    async getArtist(
        @Query('id') artistId 
    ){
        return this.spotifyApiService.getArtistById(artistId)
    } 

}