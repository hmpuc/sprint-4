import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { createObjectCsvWriter} from 'csv-writer'
import { PrismaService } from './prisma.service';
import { createReadStream } from 'fs';
import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';

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

  async generateBadge(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const badge = new PDFDocument();
    const outputPath = `./badges/badge-${user.id}.pdf`;

    // Cria a pasta badges se não existir
    if (!fs.existsSync('./badges')) {
      fs.mkdirSync('./badges');
    }

    badge.pipe(fs.createWriteStream(outputPath));

    badge.fontSize(20).text('Badge do Usuário');
    badge.moveDown();
    badge.fontSize(14).text(`Nome: ${user.name}`);
    badge.text(`Email: ${user.email}`);
    badge.text(`Nível: ${user.level}`);
    badge.text(`Criado em: ${user.createdAt.toLocaleString()}`);

    badge.end();

    const fileStream = createReadStream(outputPath);
    return fileStream;
  }
  async getBadge(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const badge = new PDFDocument();
    const outputPath = `./badges/badge-${user.id}.pdf`;

    // Cria a pasta badges se não existir
    if (!fs.existsSync('./badges')) {
      fs.mkdirSync('./badges');
    }

    badge.pipe(fs.createWriteStream(outputPath));

    badge.fontSize(20).text('Badge do Usuário');
    badge.moveDown();
    badge.fontSize(14).text(`Nome: ${user.name}`);
    badge.text(`Email: ${user.email}`);
    badge.text(`Nível: ${user.level}`);
    badge.text(`Criado em: ${user.createdAt.toLocaleString()}`);

    badge.end();

    const fileStream = createReadStream(outputPath);
    return fileStream;
  }
}


