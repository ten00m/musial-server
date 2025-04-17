import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user-dto";
import { UserService } from "../User/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { User } from "src/schemas/user.schema";

@Injectable()
export class AuthService{

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}
    
    async login(userDto: CreateUserDto){
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getUserByLogin(userDto.login)

        if (candidate){
            throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.BAD_REQUEST)
        }
        console.log(candidate, userDto)

        const hash = await bcrypt.hash(userDto.password, 10)

        const user = await this.userService.createUser({...userDto, password: hash})
        return this.generateToken(user)
    }

    private async validateUser(userDto: CreateUserDto): Promise<User>{
        const user = await this.userService.getUserByLogin(userDto.login)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        
        if(passwordEquals){
            return user
        }
        throw new UnauthorizedException({message: "Неверный логин или пароль"})
    }

    private generateToken(user: User){
        const payload = {login: user.login, id: user._id}

        return { 
            token : this.jwtService.sign(payload)
        }
    } 
}