import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "../User/user.service";
import { UserModule } from "../User/user.module";
import { JwtModule } from "@nestjs/jwt";


@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports:  [
        UserModule,
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || "SECRET",
            signOptions: {
                expiresIn: '72h'
            }
        })
    ]
})
export class AuthModule{

}