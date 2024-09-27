import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user-dto";
import { UserService } from "../User/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bycript from 'bcryptjs'
import { User } from "src/schemas/user.schema";

@Injectable()
export class AuthService{

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}
    
    async login(userDto: CreateUserDto){

    }

    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getUserByLogin(userDto.login)

        if (candidate){
            throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.BAD_REQUEST)
        }
        console.log(candidate, userDto)

        const hash = await bycript.hash(userDto.password, 10)

        const user = await this.userService.createUser({...userDto, password: hash})
        return this.generateToken(user)
    }

    generateToken(user: User){
        const payload = {login: user.login, id: user._id}
        console.log(payload)

        return { 
            token : this.jwtService.sign(payload)
        }
    } 
}