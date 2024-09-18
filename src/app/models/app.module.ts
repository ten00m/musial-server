import { Module} from "@nestjs/common";
import { SearchModule } from "./Search/search.module";
import { UpdateDataModule } from "./UpdateData/update.module";
import { Mongoose } from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { SpotifyApiModule } from "./SpotifyApi/spotifyApi.module";
import { CorrespondenceModule } from "./Correspondence/correspondece.module";
import { UserModule } from "./User/user.module";
import { TrackModule } from "./Track/track.module";

@Module({
    imports: [
        SearchModule, 
        UpdateDataModule,
        SpotifyApiModule,
        CorrespondenceModule,
        UserModule,
        TrackModule,
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/musialTest')
    ]
})
export class AppModule {

}