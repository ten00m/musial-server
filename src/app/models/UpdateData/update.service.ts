import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as fs from 'node:fs'
import { HTMLDocument } from "src/utils/HTMLDocument/HTMLDocument";


@Injectable()
export class UpdateDataService{

    async update(){
        fs.readFile('./static/genres.txt', 'utf-8', (err, data) => {
            this.searchByGenres(data.split(' '))
        })
    }

    async searchByGenres(genres: Array<string>){
        const checkProgress = (i, lengthArr, dist) => {
            if (i % dist === 0){
                console.log(i*100/lengthArr)
            }
        }

            const getVariable = async (url, variable) => {

                const req = await axios.get(url)
                const data = req.data

                const beginPos = data.indexOf(`${variable} = `) + variable.length + 4
                const endPos = data.indexOf(`"`, beginPos)
                const vari = data.slice(beginPos, endPos)

                return vari

            }



        const apiHeader = await getVariable('https://everynoise.com/research.cgi', 'apiheader')
        const spotifyApiurl = 'https://api.spotify.com/v1/artists/'

        for(let i = 0; i < genres.length; i++){
            checkProgress(i, genres.length, 20) 

            const genre = genres[i]
  
            const url = `https://everynoise.com/engenremap-${genre}.html` 

            const doc = await HTMLDocument.create(url)
            const artistsIds = doc.getDivByClassName('genre scanme').slice(0, -1).map(e => e.getPropertyOfElem('href').split('=')[1])

            fs.appendFile('./static/artistsIds.txt', artistsIds.join(` ${i}\n`) + `\n`, 'utf-8', e => {})


            // let reqs = 0
            // const maxReqs = 10

            // const time = reqs <= maxReqs ? 0 : 5000

            // setTimeout(() => {
            //     console.log(time)
            //     reqs++
            //     HTMLDocument.create(url).then(doc => {
            //         const artistIds = doc.getDivByClassName('genre scanme').slice(0, -1).map(e => e.getPropertyOfElem('href').split('=')[1])
            //         fs.appendFile('./static/artistsIds.txt', artistIds.join(`\n`) + `\n`, 'utf-8', e => {}) 
            //         reqs--
            //     }) 
            // }, time)
            
            /* 
            artists 
            {
                id: id, 
                name: name, 
                genres: [genres],
                alboms: [albomIds],
                tracks: [tracks],
                picSrc: picSrc,
            }   
            alboms/singles
            {
                albomId: albomId,
                artistId: artistId,
                tracks: [trackIds]
            }
            tracks
            {
                trackId: trackId,
                artistId: artistId,
                trackName: trackName,
                trackSrc: trackSrc,
                imgSrc: imgSrc,
                duration: duration
            }  
            */

        }
    }
}