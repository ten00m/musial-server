import { Injectable } from "@nestjs/common";
import { SearchService } from "../Search/search.service";
import { SongItem } from "src/utils/SongItem/SongItem";
import { ArtistItem } from "../Search/SearchResInterface";


@Injectable()
export class CorrespondenceService{
    constructor(private searchService: SearchService){}

    async getArtistByArtistName(artistName): Promise<ArtistItem>{
        const searchRes = await this.searchService.searchByArtistName(artistName)
        const artistItem = searchRes.items[0]        
        return artistItem
    }

    async getSongBySongName(songName): Promise<SongItem>{
        const searchRes = await this.searchService.searchBySongName(songName)
        const firstElem = searchRes[0]
        return firstElem
    }
}