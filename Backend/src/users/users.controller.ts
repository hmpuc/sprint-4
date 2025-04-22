import { Body, Controller, Post, Get, Param, ParseIntPipe, Patch, Delete, UsePipes, ValidationPipe, UseGuards, SetMetadata, Put, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser, UpdateUser, VerifyLevel } from './users.dto'
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { Role } from '../roles/roles.enum';

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
  @UseGuards(RolesGuard) // Guard ensures user can only update their own profile and checks role permissions
  async update(
  @Param('id', ParseIntPipe) id: number,
  @Body() user: UpdateUser,
  @Req() req: any, // Inject the current user's data (req.user)
  ) {
  return this.usersService.update(id, user, req.user.id, ); // Service checks ownership and role
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