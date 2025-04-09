import { Module } from '@nestjs/common';
import { UserController } from './rooms.controller';
import { UserService } from './rooms.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService]
})
export class UsersModule {}