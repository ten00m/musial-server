import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Track } from "./track.schema";
import mongoose from "mongoose";


export type UserDocument = User & Document

@Schema()
export class User{

    @Prop({unique: true})
    login: string;

    @Prop()
    password: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
    tracks: Array<Track> 
}

export const UserSchema = SchemaFactory.createForClass(User)