import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "src/dto/create-user-dto";
import { User } from "src/schemas/user.schema";


@Injectable()
export class UserService{
    constructor(
        @InjectModel(User.name) private userRepository: Model<User>
    ){}

    async getAllUsers(){
        const users = await this.userRepository.find()
        return users
    }

    async createUser(dto: CreateUserDto){
        console.log(`user ${dto.login} created with password ${dto.password}`)
        return this.userRepository.create(dto)
    }
}