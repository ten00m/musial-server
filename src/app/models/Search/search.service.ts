import { Inject, Injectable } from "@nestjs/common";
import { HTMLDocument } from "src/utils/HTMLDocument/HTMLDocument";
import { SongItem } from "src/utils/SongItem/SongItem";
import { SpotifyApiService } from "../SpotifyApi/spotifyApi.service";
import { SearchRes } from "./SearchResInterface";


@Injectable()
export class SearchService{
    constructor(private spotifyApiService: SpotifyApiService){
        spotifyApiService.init();
        setInterval(() => {
            spotifyApiService.init()
        }, 100000) 
    }

    async searchFunc(mode: string, searchStr: string): Promise<Array<SongItem> | SearchRes>{
        if (mode === "song"){
            return await this.searchBySongName(searchStr)
        }else if (mode === "name"){
            return await this.searchByArtistName(searchStr)
        }
    }

    async searchBySongName(searchStr: string): Promise<Array<SongItem>>{
        const url = "https://ru.muzyet.net/search/" + searchStr
        const doc = await HTMLDocument.create(url)
        const items = doc.getElementsByTag('item')

        const audioProp = 'data-id'
        const imageProp = 'data-src' 
        const artistNameProp = 'artist_name'

        const arrOfSongItems = items.map(e => new SongItem(e, audioProp, imageProp, artistNameProp))

        return arrOfSongItems
    }

    async searchByArtistName(searchStr: string): Promise<SearchRes>{
        const searchRes = await this.spotifyApiService.searchByArtist(searchStr)
        return searchRes
    }
}