import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(registerUserDto: RegisterUserDto) {
    const {
      fullName,
      email,
      password,
      phoneNumber,
      profileBio,
      profileSkills,
      profileResume,
      profileResumeOriginalName,
      profilePhoto,
      role,
    } = registerUserDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('El email ya está en uso.');
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPass,
        phoneNumber,
        profileBio,
        profileSkills,
        profileResume,
        profileResumeOriginalName,
        profilePhoto,
        role,
      },
    });

    return {
      user,
      success: true,
      message: 'Usuario creado exitosamente',
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const {
      fullName,
      email,
      phoneNumber,
      profileBio,
      profileSkills,
      profileResume,
      profilePhoto,
    } = updateUserDto;

    if (!fullName || !email || !phoneNumber) {
      throw new BadRequestException('Algunos campos son obligatorios.');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        fullName,
        email,
        phoneNumber,
        profileBio,
        profileSkills,
        profileResume,
        profilePhoto,
      },
    });

    return updatedUser;
  }
}
