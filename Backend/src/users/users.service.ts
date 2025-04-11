import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  
  async create(user)  {
    const checkEmpty = await this.prisma.user.findUnique({
      where: {
        email: user.email
      }
    })
    if (checkEmpty) throw new HttpException("Já existe um usuário com esse email!", HttpStatus.BAD_REQUEST);

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

  async findOne(id) {
    const user = await this.prisma.user.findUnique({ 
      where: {
        id: id
      }
    })
    if (!user) throw new HttpException("Não existe um usuário com esse id!", HttpStatus.NOT_FOUND);

    return user;
  }

  async update(id, user) {
    
    if (!user.name && !user.email && !user.password && !user.level && !user.profile_img) throw new HttpException("Precisa conter pelo menos uma informção!", HttpStatus.BAD_REQUEST)
    
    const userDb = await this.prisma.user.findUnique({ 
      where: {
        id: id
      }
    })
    if (!userDb) throw new HttpException("Não existe um usuário com esse id!", HttpStatus.NOT_FOUND);
    
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

  async delete(id) {

    const user = await this.prisma.user.findUnique({ 
      where: {
        id: id
      }
    })
    if (!user) throw new HttpException("Não existe um usuário com esse id!", HttpStatus.NOT_FOUND);

    return this.prisma.user.delete({
      where: {
        id: id
      }
    })
  }

  async updateLevel(id, level) {

    const user = await this.prisma.user.findUnique({ 
      where: {
        id: id
      }
    })
    if (!user) throw new HttpException("Não existe um usuário com esse id!", HttpStatus.NOT_FOUND);

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
