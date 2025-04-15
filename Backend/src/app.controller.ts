import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { pipeline } from 'stream/promises';
import { Response } from 'express';
import { Public } from './public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/report')
  @Public()
  async getUserCsv(@Res({passthrough: true}) res: Response) {
    const fileStream = await this.appService.getUserCsv();

    await pipeline(fileStream, res);
  }
}
