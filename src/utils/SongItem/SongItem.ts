
//экземпляр создается из объекта item

import { HTMLElement } from "../HTMLDocument/HTMLElement";

export class SongItem{
    readonly imageSrc: string;
    readonly audioSrc: string;
    readonly artistName: string;
    readonly songName: string;
    readonly duration: number;

    constructor(item: HTMLElement, audioProp: string, imageProp: string, artistNameProp: string){
        this.audioSrc = this.getAudioSrc(audioProp, item)
        this.imageSrc = this.getImageSrc(imageProp, item);
        [this.artistName, this.songName, this.duration] = this.getSongArtDur(artistNameProp, item)
    }

    private getAudioSrc(audioProp: string, item: HTMLElement): string{
        return item.getPropertyOfElem(audioProp)
    }

    private getImageSrc(imageProp: string, item: HTMLElement): string{
        return item.getPropertyOfElem(imageProp)
    }

    private getSongArtDur(artistNameProp: string, item: HTMLElement): [string, string, number]{ //возвращает название песни, имя исполнителя, длительность песни в секундах
        const spans = item.getElementsByTag('span')
        let artistName: string = ''
        let songName: string = ''
        let durationStr: string = ''

        for(let span of spans){
            const className = span.getPropertyOfElem('class')

            if(className === artistNameProp){
                [artistName, songName] = span.getInnerHTML().split(' - ')
            } else if(className === 'sure'){
                durationStr = span.getInnerHTML()
            }
        }
        songName = songName.slice(0, -1)

        const [min, sec] = durationStr.split(':').map(e => Number(e))
        const duration: number = sec + 60*min

        return [artistName, songName, duration]
    }

    
}