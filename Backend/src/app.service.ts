import { Injectable } from '@nestjs/common';
import { createObjectCsvWriter} from 'csv-writer'
import { PrismaService } from './prisma.service';
import { createReadStream } from 'fs';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getUserCsv() {
    const csvFilePath = './csv/user.csv'
    const csvWriter = createObjectCsvWriter({
      path: csvFilePath,
      header: [
          {id: 'id', title: 'ID'},
          {id: 'name', title: 'Name'},
          {id: 'email', title: 'Email'},
          {id: 'password', title: 'Password'},
          {id: 'level', title: 'Level'},
          {id: 'profile_img', title: 'Profile Image'},
          {id: 'createdAt', title: 'Created At'}
      ],
      append: false
    })
    const users = await this.prisma.user.findMany();

    csvWriter.writeRecords(users);

    const fileStream = createReadStream(csvFilePath);
    return fileStream;
  }
}