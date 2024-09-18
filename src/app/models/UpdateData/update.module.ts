import { Module } from "@nestjs/common";
import { UpdateDataController } from "./update.controller";
import { UpdateDataService } from "./update.service";
import { MongooseModule } from "@nestjs/mongoose";


@Module({
    controllers: [UpdateDataController],
    providers: [UpdateDataService],
    imports: [
    ]
})
export class UpdateDataModule{

}