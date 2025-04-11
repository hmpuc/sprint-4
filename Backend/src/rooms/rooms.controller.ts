import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoom, UpdateRoom} from './rooms.dto'

@Controller()
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}
    @Post('room')
    async create(@Body() room: CreateRoom) {
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

    @Patch('room/:id') 
    async update(@Param('id', ParseIntPipe) id: number, @Body() room: UpdateRoom) {
        return this.roomsService.update(id, room);
    }

    @Delete('room/:id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.roomsService.delete(id);
    }
}