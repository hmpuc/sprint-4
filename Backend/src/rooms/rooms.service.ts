import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoomsService {
    constructor(private prisma: PrismaService) {}


    async create(room) {
        if (!room.acessLevel || !room.description) throw new HttpException("Precisa conter todas as informações", HttpStatus.BAD_REQUEST)
        const roomExist = await this.prisma.room.findFirst({
            where: {
                description: room.description
            }
        })
        if (roomExist) throw new HttpException("Já existe uma sala com esse nome", HttpStatus.BAD_REQUEST)

        return this.prisma.room.create({ 
            data: {
                ...room,
                acessLevel: parseInt(room.acessLevel)
            }
        });
    }

    findAll() {
        return this.prisma.room.findMany();
    }

    async findOne(id: number) {
        const room = await this.prisma.room.findUnique({ 
        where: {
            id: id
        }
        })
        if(!room) throw new HttpException("A sala não existe", HttpStatus.NOT_FOUND)
        return this.prisma.room.findUnique({
            where: {
                id: id
            }
        })
    }

    async update(id: number, room) {
        if (!room.acessLevel && !room.description) throw new HttpException("Precisa conter pelo menos uma informção!", HttpStatus.BAD_REQUEST)
        const roomExist = await this.prisma.room.findFirst({
            where: {
                id: id
            }
        })
        if (!roomExist) throw new HttpException("Não existe uma sala com esse id", HttpStatus.BAD_REQUEST)
        
        if (room.acessLevel) {
            room.acessLevel = parseInt(room.acessLevel);
        }
        return this.prisma.room.update({ 
            where: {
                id: id
            },
            data: room
        });
    }

    async delete(id: number) {
        const room = await this.prisma.room.findUnique({ 
            where: {
                id: id
            }
            })
            if(!room) throw new HttpException("A sala não existe", HttpStatus.NOT_FOUND)
            return this.prisma.room.delete({
            where: {
                id: id
            }
        })
    }

}
