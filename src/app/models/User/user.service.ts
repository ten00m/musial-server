import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "src/dto/create-user-dto";
import { Track } from "src/schemas/track.schema";
import { FavouriteGenre, User } from "src/schemas/user.schema";


@Injectable()
export class UserService{
    constructor(
        @InjectModel(User.name) private userRepository: Model<User>
    ){}

    async getAllUsers(): Promise<User[]>{
        const users = await this.userRepository.find()
        return users
    }

    async getUserById(userId: string): Promise<User>{
        const user = await this.userRepository.findById(userId)
        return user
    }

    async getUserByLogin(userLogin: string): Promise<User>{
        const user = await this.userRepository.findOne({login: userLogin})
        return user
    }

    async createUser(dto: CreateUserDto){
        console.log(`user ${dto.login} created with password ${dto.password}`)
        return this.userRepository.create(dto)
    } 

    async getUserTracksById(userId: string): Promise<Array<Track>>{
        const user = await this.userRepository.findById(userId)
        return user.tracks
    }

    async addGenre(genre: string, userId: string){
        const user = await this.userRepository.findById(userId)

        for (let i = 0; i < user.genresOfFavorites.length; i++){
            const elem = user.genresOfFavorites[i]

            if(elem.genre === genre){
                const changed = [...user.genresOfFavorites]

                const update: FavouriteGenre = {
                    genre: genre,
                    count: user.genresOfFavorites[i].count + 1
                } 

                changed[i] = update
                await user.updateOne({genresOfFavorites: changed})

                return update
            }
        }

        const favouriteGenre: FavouriteGenre = {
            genre: genre,
            count: 1,
        }

        const update = [...user.genresOfFavorites, favouriteGenre]

        await user.updateOne({genresOfFavorites: update})

        return update
    }

    
}