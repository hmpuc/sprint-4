import { Controller, Get, Res, Post, Param, ParseIntPipe } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/badge/:id")
  async generateBadge(@Param('id',ParseIntPipe)id:number){
    return this.appService.generateBadge(id);
  }
}
