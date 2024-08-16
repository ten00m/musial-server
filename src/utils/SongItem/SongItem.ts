
//экземпляр создается из объекта item

import { HTMLElement } from "../HTMLDocument/HTMLElement";

export class SongItem{
    readonly imageSrc: string;
    readonly audioSrc: string;
    readonly artistName: string;
    readonly songName: string;
    readonly duration: string;

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

    private getSongArtDur(artistNameProp: string, item: HTMLElement){ //возвращает название песни, имя исполнителя, длительность песни
        const spans = item.getElementsByTag('span')
        let artistName = ''
        let songName = ''
        let duration = ''
        console.log(spans)

        for(let span of spans){
            const className = span.getPropertyOfElem('class')

            if(className === artistNameProp){
                [artistName, songName] = span.getInnerHTML().split(' - ')
            } else if(className === 'sure'){
                duration = span.getInnerHTML()
            }
        }
        songName = songName.slice(0, -1)
        return [artistName, songName, duration]
    }

    
}