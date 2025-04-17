import { Body, Controller, Delete, Post, Put, Query } from "@nestjs/common";
import { TrackDto } from "src/dto/track-dto";
import { TrackService } from "./track.service";
import { DeleteTrackDto } from "src/dto/delete-track-dto";
import { AddTrackDto } from "src/dto/add-track-dto";


@Controller('users/tracks')
export class TrackController{
    constructor(private trackService: TrackService){}

    @Put('/add-track')
    async addTrack(@Body() addTrackDto: AddTrackDto){ 
        return this.trackService.addTrackToTrackList(addTrackDto.userId, addTrackDto.track)
    }

    @Delete('/delete-track')
    async deleteTrack(@Query() deleteTrackDto: DeleteTrackDto){
        return this.trackService.deleteTrackFromTrackList(deleteTrackDto.userId, deleteTrackDto.trackId)
    }
}