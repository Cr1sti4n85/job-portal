import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'Campo obligatorio' })
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty({ message: 'Campo obligatorio' })
  password: string;
}
