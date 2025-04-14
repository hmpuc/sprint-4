import { Body, Controller, Post, Get, Param, ParseIntPipe, Patch, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser, UpdateUser, VerifyLevel } from './users.dto'
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { Role } from '../roles/roles.enum';

@UseGuards()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() user: CreateUser) {
    return this.usersService.create(user);
  }

  @Get()
  @Roles(Role.Admin, Role.CommonUser, Role.IntermediateUser)
  async findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @Roles(Role.Admin, Role.CommonUser, Role.IntermediateUser)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id)
    return this.usersService.findOne(id);
  }

  @Patch(':id') 
  async update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUser) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Patch(':id/level') 
  async updateLevel(@Param('id', ParseIntPipe) id: number, @Body() updateLevelDto: VerifyLevel) {
    return this.usersService.updateLevel(id, updateLevelDto.level);
  }
}