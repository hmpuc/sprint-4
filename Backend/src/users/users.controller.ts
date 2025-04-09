import { Body, Controller, Post, Get, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

interface UpdateLevelDto {
  level: number;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: Prisma.UserCreateInput) {
    return this.usersService.create(user);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id') 
  async update(@Param('id', ParseIntPipe) id: number, @Body() user: Prisma.UserUpdateInput) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Patch(':id/level') 
  async updateLevel(@Param('id', ParseIntPipe) id: number, @Body() updateLevelDto: UpdateLevelDto) {
    console.log(updateLevelDto)
    return this.usersService.updateLevel(id, updateLevelDto.level);
  }
}