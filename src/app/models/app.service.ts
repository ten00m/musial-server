import { Injectable } from "@nestjs/common";
import { HTMLDocument } from "src/utils/HTMLDocument/HTMLDocument";
import { HTMLElement } from "src/utils/HTMLDocument/HTMLElement";

@Injectable()
export class AppService {
    
    async getHTMLDoc(): Promise<any>{
        const src = 'https://muzyet.net/search/jeff'
        const doc = await HTMLDocument.create(src)
        return doc.getElementsByTag('div')[30].getPropertyOfElem('class')
    }
}