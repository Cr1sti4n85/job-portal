import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import type { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/types/current-user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signin(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;

    const expiresAccessToken = new Date();
    const expirationMs = parseInt(
      this.configService.getOrThrow<string>('JWT_ACCESS_EXPIRATION_MS'),
    );

    expiresAccessToken.setTime(expiresAccessToken.getTime() + expirationMs);

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Credenciales inválidas');
    }

    const accessToken = this.jwtService.sign(
      { userId: user.id },
      {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
        expiresIn: `${this.configService.getOrThrow<number>('JWT_ACCESS_EXPIRATION_MS')}ms`,
      },
    );

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure:
        this.configService.getOrThrow<string>('NODE_ENV') === 'production',
      expires: expiresAccessToken,
      sameSite: 'lax',
    });

    return {
      user,
      success: true,
      message: 'Inicio de sesión exitoso',
    };
  }

  logout(user: User, res: Response) {
    res.clearCookie('access_token');
  }
}
