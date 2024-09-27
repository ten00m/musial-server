import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "src/dto/create-user-dto";
import { AuthService } from "./auth.service";


@Controller('/auth')
export class AuthController{

    constructor(private authService: AuthService){}
    
    @Post('/login')
    async login(
        @Body() userDto: CreateUserDto
    ){
        this.authService.login(userDto)
    }

    @Post('/logout')
    async logout(){

    }

    @Post('/registration')
    async registration(
        @Body() userDto: CreateUserDto
    ){
        return this.authService.registration(userDto)
    }
}