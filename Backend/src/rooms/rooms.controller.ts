import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, Put} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Prisma} from '@prisma/client';

@Controller()
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}
    @Post('room')
    async create(@Body() room: Prisma.RoomCreateInput) {
        return this.roomsService.create(room);
    }

    @Get('rooms')
    async findAll() {
        return this.roomsService.findAll()
    }

    @Get('room/:id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.roomsService.findOne(id);
    }

    @Put('room/:id') 
    async update(@Param('id', ParseIntPipe) id: number, @Body() user: Prisma.RoomUpdateInput) {
        return this.roomsService.update(id, user);
    }

    @Delete('room/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.roomsService.delete(id);
    }

    // @Patch('room/:id') 

    // async updateLevel(@Param('id', ParseIntPipe) id: number, @Body() updateLevelDto: UpdateLevelDto) {
    //     console.log(updateLevelDto)
    //     return this.roomsService.updateLevel(id, updateLevelDto.level);
    // }
}