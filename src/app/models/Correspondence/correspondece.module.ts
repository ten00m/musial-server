import { Module } from "@nestjs/common";
import { CorrespondenceController } from "./correspondence.controller";
import { CorrespondenceService } from "./correspondence.service";
import { SearchModule } from "../Search/search.module";


@Module({
    controllers:[CorrespondenceController],
    providers:[CorrespondenceService],
    imports:[SearchModule]
})
export class CorrespondenceModule{}