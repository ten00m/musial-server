import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app/models/app.module"
import { SpotifyApiService } from "./app/models/SpotifyApi/spotifyApi.service"

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000
        const app = await NestFactory.create(AppModule)
        
        const spotApi = new SpotifyApiService();
        

        console.log(process.env.PRIVATE_KEY)

        await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
    } catch(e) { 
        console.log(e)
    }
}

start()