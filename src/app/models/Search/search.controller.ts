import { Controller, Get, Injectable, Query } from "@nestjs/common";
import { SearchService } from "./search.service";

@Controller(
    '/search'
)
export class SearchController{

    constructor(private searchService: SearchService){}

    @Get('')
    async search(
        @Query('mode') mode: string | undefined,
        @Query('q') searchStr: string | undefined 
    ){
        return this.searchService.searchFunc(mode, searchStr)
    }
}  