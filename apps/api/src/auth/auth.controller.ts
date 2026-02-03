import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import type { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { User } from 'src/types/current-user';
import { CurrentUser } from 'src/common/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signin(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signin(loginUserDto, res);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  logout(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    console.log({ 'cookies ': req.cookies });
    return this.authService.logout(user, res);
  }
}
