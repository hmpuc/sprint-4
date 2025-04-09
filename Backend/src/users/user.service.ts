import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/users/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    create(user: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data: user });
    }
}