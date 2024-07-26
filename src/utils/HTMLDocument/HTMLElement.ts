import { Parser } from "./Parser";

export class HTMLElement{
    text: string;
    parser: Parser;

    constructor(elemStr: string){
        this.text = elemStr
        this.parser = new Parser
    }

    getInnerHTML(): string{
        const innerHTML = this.parser.getInnerHTML(this.text)
        return innerHTML
    }

    getPropertyOfElem(prop: string){
        const posOfDataId = this.text.indexOf(`${prop}="`) + `${prop}="`.length //смотрим позицию строки {prop}=
    
        const posOfLastSym = this.text.indexOf(`"`, posOfDataId + 1) //смторим первую ковычку после {prop}=, чтобы выделить ссылку из строки
        
        const propData = this.text.slice(posOfDataId, posOfLastSym)  // получаем значение свойства
    
        return propData
    }
}