import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
          provide: APP_GUARD,
          useClass: AuthGuard,
    },
  ]
})
export class UsersModule {}

