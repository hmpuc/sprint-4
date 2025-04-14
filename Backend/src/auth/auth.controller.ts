import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/public.decorator';

@Controller('login')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    @Public()
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.email, signInDto.password);
    }
}
