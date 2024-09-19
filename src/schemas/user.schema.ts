import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Track } from "./track.schema";
import mongoose from "mongoose";


export type UserDocument = User & Document

@Schema()
export class User{

    @Prop({unique: true, required: true})
    login: string;

    @Prop({required: true})
    password: string;

    @Prop()
    selectedGenres: Array<string>

    @Prop()
    genresOfFavorites: Array<string>  

    @Prop()
    favoritesArtists: Array<string>

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
    tracks: Array<Track> 
}

export const UserSchema = SchemaFactory.createForClass(User)