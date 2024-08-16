import { Injectable } from "@nestjs/common";
import { HTMLDocument } from "src/utils/HTMLDocument/HTMLDocument";
import { SongItem } from "src/utils/SongItem/SongItem";

//важно!!!
//спарсить данные с евери нойс
//пройтись по жанрам и получить
//имена исполнителей и их жанры
//альбомы исполнителей с песнями
//ссылки на картинки
@Injectable()
export class SearchService{

    async searchFunc(mode: string, searchStr: string): Promise<Array<SongItem | string>>{
        if (mode === "song"){
            return await this.searchBySongName(searchStr)
        }
    }

    async searchBySongName(searchStr: string): Promise<Array<SongItem>>{
        const url = "https://ru.muzyet.net/search/" + searchStr
        const doc = await HTMLDocument.create(url)
        const items = doc.getElementsByTag('item')

        const audioProp = 'data-src'
        const imageProp = 'data-id'
        const artistNameProp = 'artist_name'

        const arrOfSongItems = items.map(e => new SongItem(e, audioProp, imageProp, artistNameProp))

        return arrOfSongItems
    }
}