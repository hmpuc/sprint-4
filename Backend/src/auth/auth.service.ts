import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ){}

    async validateUser(email: string, senha: string){
        const user = await this.usersService.findByEmail(email);
        if (!user){
            throw new UnauthorizedException('Usuário não encontrado');
        }

        const senhaValida = await bcrypt.compare(senha, user.password);
        if(!senhaValida){
            throw new UnauthorizedException('Senha inválida')
        }

        return user
    }

    async login (user: any){
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
