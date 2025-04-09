import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create(user: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: user });
  }
}