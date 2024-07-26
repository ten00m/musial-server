import { Controller, Get, Injectable } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller(
    '/'
)
export class AppController {

    constructor(private appService: AppService){}

    @Get(
        '/html'
    )
    getHTMLDoc() {
        return this.appService.getHTMLDoc()
    }
}