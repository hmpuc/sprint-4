import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UsePipes, ValidationPipe, Put, UseGuards} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoom, UpdateRoom} from './rooms.dto'
import { Role } from 'src/roles/roles.enum';
import { Roles } from 'src/roles/roles.decorator';

@UseGuards()
@Controller('places')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {}

    @Roles(Role.Admin)
    @Post('')
    async create(@Body() room: CreateRoom) {
        return this.roomsService.create(room);
    }

    @Get('')
    async findAll() {
        return this.roomsService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.roomsService.findOne(id);
    }

    @Roles(Role.Admin, Role.IntermediateUser4)
    @Put(':id') 
    async update(@Param('id', ParseIntPipe) id: number, @Body() room: UpdateRoom) {
        return this.roomsService.update(id, room);
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.roomsService.delete(id);
    }
}