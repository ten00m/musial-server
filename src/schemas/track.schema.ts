import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type TrackDocument = Track & Document

@Schema()
export class Track{

    @Prop()
    title: string;

    @Prop()
    artist: string;

    @Prop()
    artistId: string;

    @Prop()
    duration: number;

    @Prop()
    url: string;

    @Prop()
    img: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track)