import { Controller, Get, Param, Res, ParseIntPipe, Header} from '@nestjs/common';
import { AppService } from './app.service';
import { pipeline } from 'stream/promises';
import { Response } from 'express';
import { Public } from './public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/report')
  async getUserCsv(@Res({passthrough: true}) res: Response) {
    const fileStream = await this.appService.getUserCsv();

    await pipeline(fileStream, res);
  }
  @Get("badge/:id")
  async generateBadge(@Param('id', ParseIntPipe) id: number, @Res({passthrough: true}) res: Response){
    const fileStream = await this.appService.generateBadge(id);

    await pipeline(fileStream, res);
  }
}
