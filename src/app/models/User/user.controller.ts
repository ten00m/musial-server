import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "src/dto/create-user-dto";


@Controller('users')
export class UserController{
    constructor(private userService: UserService){}


    
    @Get('/get_all')
    async getUsers(){
        return this.userService.getAllUsers()
    }

    @Get('/get_by_id')
    async getUserById(
        @Query('id') userId: string
    ){
        return this.userService.getUserById(userId)
    }

    @Get('get_by_login')
    async getUserByLogin(
        @Query('login') userLogin: string
    ){
        return this.userService.getUserByLogin(userLogin)
    }

}
