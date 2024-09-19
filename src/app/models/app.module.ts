import { Module} from "@nestjs/common";
import { SearchModule } from "./Search/search.module";
import { UpdateDataModule } from "./UpdateData/update.module";
import { Mongoose } from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { SpotifyApiModule } from "./SpotifyApi/spotifyApi.module";
import { CorrespondenceModule } from "./Correspondence/correspondece.module";
import { UserModule } from "./User/user.module";
import { TrackModule } from "./Track/track.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./Auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),  
        SearchModule, 
        UpdateDataModule,
        SpotifyApiModule,
        CorrespondenceModule,
        UserModule,
        TrackModule,
        AuthModule,
        MongooseModule.forRoot(process.env.MONGO_URI), 
    ]
})
export class AppModule {

}