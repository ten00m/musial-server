
//экземпляр создается из объекта item

import { HTMLElement } from "../HTMLDocument/HTMLElement";

export class SongItem{
    readonly img: string;
    readonly url: string;
    readonly artist: string;
    readonly title: string;
    readonly duration: number;

    constructor(item: HTMLElement, audioProp: string, imageProp: string, artistNameProp: string){
        this.url = this.getAudioSrc(audioProp, item)
        this.img = this.getImageSrc(imageProp, item);
        [this.artist, this.title, this.duration] = this.getSongArtDur(artistNameProp, item)
    }

    private getAudioSrc(audioProp: string, item: HTMLElement): string{
        return item.getPropertyOfElem(audioProp)
    }

    private getImageSrc(imageProp: string, item: HTMLElement): string{
        return item.getPropertyOfElem(imageProp)
    }

    private getSongArtDur(artistNameProp: string, item: HTMLElement): [string, string, number]{ //возвращает название песни, имя исполнителя, длительность песни в секундах
        const spans = item.getElementsByTag('span')
        let artist: string = ''
        let title: string = ''
        let durationStr: string = ''

        for(let span of spans){
            const className = span.getPropertyOfElem('class')

            if(className === artistNameProp){
                [artist, title] = span.getInnerHTML().split(' - ')
            } else if(className === 'sure'){
                durationStr = span.getInnerHTML()
            }
        }
        title = title.slice(0, -1)

        const [min, sec] = durationStr.split(':').map(e => Number(e))
        const duration: number = sec + 60*min

        return [artist, title, duration]
    }

    
}