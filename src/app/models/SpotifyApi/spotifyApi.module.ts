import { Module } from "@nestjs/common";
import { SpotifyApiController } from "./spotifyApi.controller";
import { SpotifyApiService } from "./spotifyApi.service";


@Module({
    controllers: [SpotifyApiController],
    providers: [SpotifyApiService],
    exports: [SpotifyApiService]
})
export class SpotifyApiModule{

}
