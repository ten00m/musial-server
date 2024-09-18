import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import axios from "axios";
import { Model } from "mongoose";
import * as fs from 'node:fs'
import { HTMLDocument } from "src/utils/HTMLDocument/HTMLDocument";


@Injectable()
export class UpdateDataService{
    


    async updateSpotId(){
        fs.readFile('./static/genres.txt', 'utf-8', (err, data) => {
            this.searchByGenres(data.split(' '))
        })
    }

    async updateArtists(){
        fs.readFile('./static/artistsIds.txt', 'utf-8', (e, data) => {
            this.getArtistsNameByIds(data.split(/\n/g).map(e => e.split(' ')[0]))
        })
    }

    private sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    private async getArtistsNameByIds(spotIds: Array<string>){
        const apiHeader = await this.getVariableFromDoc('https://everynoise.com/research.cgi', 'apiheader')

        this.spotifyApiRequest('search?q=pop&type=artist&limit=50&offset=500', apiHeader).then(data => {
            console.log(data)
        })
    }

    private async spotifyApiRequest(params: string, apiHeader: string){ 
        const spotifyApiurl = 'https://api.spotify.com/v1/'
        const config = {
            'headers': 
            {
                'Authorization': apiHeader
            } 
        }
        return (await axios.get(spotifyApiurl + params, config)).data
    }

    private async getVariableFromDoc(url, variable){
        const req = await axios.get(url)
        const data = req.data

        const beginPos = data.indexOf(`${variable} = `) + variable.length + 4
        const endPos = data.indexOf(`"`, beginPos)
        const vari = data.slice(beginPos, endPos)

        return vari
    }


    private async searchByGenres(genres: Array<string>){
        for(let i = 0; i < genres.length; i++){

            const genre = genres[i]
  
            const url = `https://everynoise.com/engenremap-${genre}.html` 

            const doc = await HTMLDocument.create(url)
            const artistsIds = doc.getDivByClassName('genre scanme').slice(0, -1).map(e => e.getPropertyOfElem('href').split('=')[1])

            fs.appendFile('./static/artistsIds.txt', artistsIds.join(` ${i}\n`) + `\n`, 'utf-8', e => {})

            /* 
            artists 
            {
                id: id, 
                name: name, 
                genres: [genres],
                alboms: [albomIds],
                tracks: [tracks],
                images: [image: {height, width, url}],
            }   
            alboms/singles
            {
                albomId: albomId,
                artistId: artistId,
                tracks: [trackIds],
                imageUrl: imageUrl
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