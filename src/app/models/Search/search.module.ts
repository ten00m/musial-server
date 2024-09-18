import { Module } from "@nestjs/common";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";
import { SpotifyApiModule } from "../SpotifyApi/spotifyApi.module";

@Module({
    controllers: [SearchController],
    providers: [SearchService],
    imports: [SpotifyApiModule],
    exports: [SearchService]
})
export class SearchModule {}