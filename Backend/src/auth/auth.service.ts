import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService
      ) {}
    
      async signIn(email: string, pass: string): Promise<{ access_token: string }> {
        console.log('oi')
        const user = await this.prismaService.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            throw new HttpException('Nenhum usuário encontrado', HttpStatus.BAD_REQUEST);
        }
        const compare = await bcrypt.compare(pass, user.password)

        if (!compare) {
            throw new HttpException('Senha incorreta', HttpStatus.FORBIDDEN);
        }
        
        const payload = { sub: user.id, username: user.name };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    
}
