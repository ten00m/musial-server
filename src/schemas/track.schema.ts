import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


export type TrackDocument = Track & Document

@Schema()
export class Track{

    _id: mongoose.Schema.Types.ObjectId

    @Prop()
    title: string;

    @Prop()
    artist: string;

    @Prop()
    duration: number;

    @Prop()
    url: string;

    @Prop()
    img: string;
}

export const TrackSchema = SchemaFactory.createForClass(Track)