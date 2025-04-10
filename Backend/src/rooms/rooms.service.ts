import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma} from '@prisma/client';

@Injectable()
export class RoomsService {
    constructor(private prisma: PrismaService) {}


    create(room: Prisma.RoomCreateInput) {
        return this.prisma.room.create({ data: room });
    }

    findAll() {
        return this.prisma.room.findMany();
    }

    findOne(id: number) {
        return this.prisma.room.findUnique({ 
        where: {
            id: id
        }
        })
    }

    update(id: number, room: Prisma.RoomUpdateInput) {
        return this.prisma.room.update({ 
        where: {
            id: id
        },
        data: room
        })
    }

    delete(id: number) {
        return this.prisma.room.delete({
        where: {
            id: id
        }
        })
    }

}
