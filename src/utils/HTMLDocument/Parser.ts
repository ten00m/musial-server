import { HTMLElement } from "./HTMLElement"

export class Parser {
    public getElementsByTag(tag, doc): Array<HTMLElement>{
        let arrayOfElements: Array<HTMLElement> = []
        doc = doc.replace(/\n/g, ' ')
        doc = doc.replace(/></g, `> <`)
        

        const splitedDoc = doc.split(' ')
        const indexes = [] //добавляем индексы найденных начал тега

        const reOfBegin = `\<${tag}\w*`
        const reOfEnd = `\</${tag}\w*`
        const oneTags = ['img', 'source'] //теги имеющие только одну часть


        for (let i = 0; i < splitedDoc.length; i++){
            if (splitedDoc[i].search(reOfBegin) !== -1){
                indexes.push(i)                          // добавляем в стек индекс встреченного элемента
            }

            if (oneTags.includes(tag) && splitedDoc[i].search('>') !== -1 && indexes.length > 0){
                const indOfBegin = indexes.pop()
                const indOfEnd = i

                const elem = splitedDoc.slice(indOfBegin, indOfEnd + 1).join(' ')
                arrayOfElements.push(elem)

            }

            else if (splitedDoc[i].search(reOfEnd) !== -1){
                const indOfBegin = indexes.pop()
                const indOfEnd = i

                const elemStr = splitedDoc.slice(indOfBegin, indOfEnd + 1).join(' ') // если встретили конечную часть тэга, составляем тело тэга
                arrayOfElements.push(new HTMLElement(elemStr))
            }
        }

        return arrayOfElements
    }

    getInnerHTML(elemStr: string): string{
        let inner = ''
        let ifFind = 0
    
        for (let i of elemStr){
            if (i === '<'){
                ifFind = 0
            }
            
            if (ifFind){
                inner += i
            }
    
            if (i === '>'){
                ifFind = 1
            }
        }
    
        return inner
    }
}