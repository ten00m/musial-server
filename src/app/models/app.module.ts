import { Module} from "@nestjs/common";
import { SearchModule } from "./Search/search.module";
import { UpdateDataModule } from "./UpdateData/update.module";

@Module({
    imports: [
        SearchModule, 
        UpdateDataModule
    ]
})
export class AppModule {

}