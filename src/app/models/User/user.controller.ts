import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "src/dto/create-user-dto";


@Controller('')
export class UserController{
    constructor(private userService: UserService){}
    
    @Get('/users')
    async getUsers(){
        return this.userService.getAllUsers()
    }

    @Post('/create')
    async createUser(
        @Body() dto: CreateUserDto
    ){
        this.userService.createUser(dto)
    }
}
