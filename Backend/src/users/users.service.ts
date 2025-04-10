import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  async create(user)  {
    const hashPassword = await bcrypt.hash(user.password, 10);

    return this.prisma.user.create({ 
      data: {
        ...user,
        password: hashPassword
      }
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id) {
    return this.prisma.user.findUnique({ 
      where: {
        id: id
      }
    })
  }

  async update(id, user) {
    if (!user.name && !user.email && !user.password && !user.level && !user.profile_img) throw new HttpException("Precisa conter pelo menos uma informção!", HttpStatus.BAD_REQUEST)
    if (user.password) {

      const hashPassword = await bcrypt.hash(user.password, 10);

      return this.prisma.user.update({
        where: {
          id: id
        },
        data: {
          password: hashPassword
        }
      })
    } else {
      return this.prisma.user.update({ 
        where: {
          id: id
        },
        data: user
      })
    }
  }

  delete(id) {
    return this.prisma.user.delete({
      where: {
        id: id
      }
    })
  }

  updateLevel(id, level) {
    return this.prisma.user.update({ 
      where: {
        id: id
      },
      data: {
        level: level
      }
    })
  }
}