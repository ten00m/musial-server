import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";


@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    exports: [UserService]
})
export class UserModule{}