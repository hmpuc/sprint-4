import { 
  Body, Controller, Post, Get, Param, ParseIntPipe, Patch, Delete, 
  UsePipes, ValidationPipe, UseGuards 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser, UpdateUser, VerifyLevel } from './users.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() user: CreateUser) {
    return this.usersService.create(user);
  }

  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id') 
  async update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUser) {
    return this.usersService.update(id, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/level') 
  async updateLevel(@Param('id', ParseIntPipe) id: number, @Body() updateLevelDto: VerifyLevel) {
    return this.usersService.updateLevel(id, updateLevelDto.level);
  }
}
