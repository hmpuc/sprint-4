import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UsersModule, RoomsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}