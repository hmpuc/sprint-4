import { Controller, Get, Param, Res , Post, ParseIntPipe} from '@nestjs/common';
import { AppService } from './app.service';
import { pipeline } from 'stream/promises';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/report')
  async getUserCsv(@Res({passthrough: true}) res: Response) {
    const fileStream = await this.appService.getUserCsv();

    await pipeline(fileStream, res);
  }
  @Post("badge/:id")
  async generateBadge(@Param('id', ParseIntPipe) id: number){
    return this.appService.generateBadge(id);

  }
}
