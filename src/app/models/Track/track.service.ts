import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import { TrackDto } from "src/dto/track-dto";
import { Track } from "src/schemas/track.schema";
import { User } from "src/schemas/user.schema";
import { TrackModule } from "./track.module";
import { HttpStatusCode } from "axios";


@Injectable()
export class TrackService{
    constructor(
        @InjectModel(User.name) private userRepository: Model<User>,
        @InjectModel(Track.name) private trackRepository: Model<Track>
    ){}

    private async createTrack(trackDto: TrackDto): Promise<Document<TrackModule>> {
        return this.trackRepository.create(trackDto)
    }

    async addTrackToTrackList(userId: string, trackDto: TrackDto){
        const user = await this.userRepository.findById(userId)
        const track = await this.createTrack(trackDto)

        await user.updateOne({tracks: [...user.tracks, track.id]})
        return track
    }

    async deleteTrackFromTrackList(userId: string, trackId: string){
        try{
            const user = await this.userRepository.findById(userId)

            await user.updateOne({tracks: user.tracks.filter((e) => String(e._id) !== trackId)})

            return trackId

        }catch (e){
            throw( new HttpException('Wrong userId or trackId', HttpStatusCode.BadRequest))
        }
    }
}