import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Track } from "./track.schema";
import mongoose from "mongoose";


export type UserDocument = User & Document

export interface FavouriteGenre{
    genre: string;
    count: number;
}

@Schema()
export class User{
    _id: mongoose.Schema.Types.ObjectId

    @Prop({unique: true, required: true})
    login: string;

    @Prop({required: true})
    password: string;

    @Prop()
    selectedGenres: Array<string>

    @Prop()
    genresOfFavorites: Array<FavouriteGenre>  

    @Prop()
    favoritesArtists: Array<string>

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
    tracks: Array<Track> 
}

export const UserSchema = SchemaFactory.createForClass(User)