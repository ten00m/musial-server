import { TrackDto } from "./track-dto";

export class AddTrackDto{
    readonly track: TrackDto;
    readonly userId: string;
}