import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as fs from 'fs'
import { Config } from "./ConfigInterface";


@Injectable()
export class SpotifyApiService{
    private spotifyApiUrl: string;
    private spotifyApiFilePath: string;
    private apiConfig: object;

    public async init(){
        this.spotifyApiUrl = 'https://api.spotify.com/v1/'
        this.spotifyApiFilePath = './static/spotApiHeader.json'

        try{
            this.apiConfig = await this.getApiHeader()
        }catch(e){
            
        }

        console.log('spotApi init')
    }

    public async getArtistById(artistId: string){
        const url = `${this.spotifyApiUrl}artists/${artistId}`
        try {
            const req = await fetch(url, this.apiConfig)  
            const artist = req.json()
            return artist
        }catch(e){
            return 'ошибка запроса к апи спотифай'
        }
    }

    public async testApi(){
        const url = `${this.spotifyApiUrl}artists/4KOst4Y7B8pOQKt6TpVc4Q`
        const req = await fetch(url, this.apiConfig) 
        return req.json()
    }

    public async searchByArtist(searchStr: string, offset=0, limit=20){
        const url = `${this.spotifyApiUrl}search?q=${searchStr}&limit=${limit}&offset=${offset}&type=artist`
        try{
            const req = await fetch(url, this.apiConfig) 
            return req.json()
        }catch(e){
            return e
        }
    }

    private async checkApiHeader(config: object): Promise<boolean>{
        const req = await fetch(this.spotifyApiUrl + 'search?q=pop&type=artist&limit=20', config);
        return req.status === 200
    }

    private async getApiHeader(): Promise<Config>{
        const data = await fs.readFileSync(this.spotifyApiFilePath, {'encoding': 'utf-8'});
        const confFromFile: Config = await JSON.parse(data); 
        
        
        if(await this.checkApiHeader(confFromFile)){
            return confFromFile
        }else{
            const apiHeader = await this.getVariableFromDoc('https://everynoise.com/research.cgi', 'apiheader')
 

            const config: Config = {
                'headers': {
                    'Authorization': apiHeader
                }
            }
            fs.writeFile(this.spotifyApiFilePath, JSON.stringify(config), e => {})
            
            return config
        }
    }

    private async getVariableFromDoc(url, variable): Promise<string>{
        const req = await fetch(url)
        const data = await req.text() 


        const beginPos = data.indexOf(`${variable} = `) + variable.length + 4
        const endPos = data.indexOf(`"`, beginPos)
        const vari = data.slice(beginPos, endPos)
 
        return vari
    }
}