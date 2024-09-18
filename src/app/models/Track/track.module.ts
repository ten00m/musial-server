import { Module } from "@nestjs/common";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Track, TrackSchema } from "src/schemas/track.schema";


@Module({
    controllers: [TrackController],
    providers: [TrackService],
    imports: [MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}])]
})
export class TrackModule{}