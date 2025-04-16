import { Body, Controller, Post, Get, Param, ParseIntPipe, Patch, Delete, UsePipes, ValidationPipe, UseGuards, SetMetadata, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser, UpdateUser, VerifyLevel } from './users.dto'
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { Role } from '../roles/roles.enum';
import { Public } from 'src/public.decorator';

@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  
  @Post()
  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe())
  async create(@Body() user: CreateUser) {
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

  @Put(':id') 
  @Roles(Role.Admin)
  async update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUser) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.IntermediateUser4)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Patch(':id/level') 
  @Roles(Role.Admin)
  async updateLevel(@Param('id', ParseIntPipe) id: number, @Body() updateLevelDto: VerifyLevel) {
    return this.usersService.updateLevel(id, updateLevelDto.level);
  }
}