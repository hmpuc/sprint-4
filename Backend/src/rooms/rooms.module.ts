import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
    controllers: [RoomsController],
    providers: [
        RoomsService,
        PrismaService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ]
})
export class RoomsModule {}