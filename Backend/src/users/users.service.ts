import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  create(user: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: user });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ 
      where: {
        id: id
      }
    })
  }

  update(id: number, user: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ 
      where: {
        id: id
      },
      data: user
    })
  }

  delete(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id
      }
    })
  }

  updateLevel(id: number, level: number) {
    return this.prisma.user.update({ 
      where: {
        id: id
      },
      data: {
        level: level
      }
    })
  }

  async findByEmail(email: string){
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
