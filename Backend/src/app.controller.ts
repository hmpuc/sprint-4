import { Controller, Get, Res } from '@nestjs/common';
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
}
