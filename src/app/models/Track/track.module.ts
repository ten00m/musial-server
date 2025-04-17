import { Module } from "@nestjs/common";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";
import { Mongoose } from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { Track, TrackSchema } from "src/schemas/track.schema";


@Module({
    controllers: [TrackController],
    providers: [TrackService],
    imports: [MongooseModule.forFeature([
        {name: User.name, schema: UserSchema},
        {name: Track.name, schema: TrackSchema}
    ])]
})
export class TrackModule{}