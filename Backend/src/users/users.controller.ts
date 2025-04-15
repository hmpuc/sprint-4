import { Body, Controller, Post, Get, Param, ParseIntPipe, Patch, Delete, UsePipes, ValidationPipe, UseGuards, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser, UpdateUser, VerifyLevel } from './users.dto'
//import { Roles } from '../roles/roles.decorator';
//import { RolesGuard } from '../roles/roles.guard';
//import { Role } from '../roles/roles.enum';

//@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() user: CreateUser) {
    return this.usersService.create(user);
  }
  

  @Get()
  //@Roles(Role.Admin, Role.CommonUser, Role.IntermediateUser2, Role.IntermediateUser3, Role.IntermediateUser4)
  async findAll() {
    return this.usersService.findAll()
  }
  
  @Get(':id')
  //@Roles(Role.Admin, Role.CommonUser, Role.IntermediateUser2, Role.IntermediateUser3, Role.IntermediateUser4)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id') 
  //@Roles(Role.Admin)
  async update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUser) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  //@Roles(Role.Admin)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Patch(':id/level') 
  //@Roles(Role.Admin)
  async updateLevel(@Param('id', ParseIntPipe) id: number, @Body() updateLevelDto: VerifyLevel) {
    return this.usersService.updateLevel(id, updateLevelDto.level);
  }
}