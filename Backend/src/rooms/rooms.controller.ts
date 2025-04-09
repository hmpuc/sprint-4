import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './rooms.service';
import { Prisma, User } from '@prisma/client';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post()
    create(@Body() user: Prisma.UserCreateInput) {
        return this.userService.create(user);
    }


}