import { HTMLElement } from "./HTMLElement";
import { Parser } from "./Parser"
import axios from 'axios'

//Класс хтмл документа. Создается при помощи ссылки на документ. Используется фабричный метод create() для сосзадния экземляра
//Так же возможно создание с помощью конструктора и текста документа
export class HTMLDocument {
    text: string;
    parser: Parser;



    constructor(text: string) {
        this.text = text
        this.parser = new Parser()
    }

    public static async create(src: string): Promise<HTMLDocument>{
        const req = await axios.get(src)
        return new HTMLDocument(req.data)
    }

    public getElementsByTag(tag: string): Array<HTMLElement> {
        const arrayOfElements = this.parser.getElementsByTag(tag, this.text)

        return arrayOfElements
    }

    public getDivByClassName(className: string){
        const divs = this.parser.getDivByClassName(className, this.text)
        
        return divs
    }
}