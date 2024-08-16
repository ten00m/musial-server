import { Module } from "@nestjs/common";
import { UpdateDataController } from "./update.controlle";
import { UpdateDataService } from "./update.service";


@Module({
    controllers: [UpdateDataController],
    providers: [UpdateDataService],
})
export class UpdateDataModule{

}