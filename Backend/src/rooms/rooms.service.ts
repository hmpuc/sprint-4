import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma} from '@prisma/client';

@Injectable()
export class RoomsService {
    constructor(private prisma: PrismaService) {}


    create(room: Prisma.RoomCreateInput) {
        if (!room.acessLevel || !room.description) throw new HttpException("Precisa conter todas as informações", HttpStatus.BAD_REQUEST)
        return this.prisma.room.create({ data: room });
        
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

    async update(id: number, room: Prisma.RoomUpdateInput) {
        if (!room.acessLevel && !room.description) throw new HttpException("Precisa conter pelo menos uma informção!", HttpStatus.BAD_REQUEST)
        return this.prisma.room.update({ 
        where: {
            id: id
        },
        data: room
        })
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
