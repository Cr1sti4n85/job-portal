import {
  IsString,
  IsNotEmpty,
  IsStrongPassword,
  IsOptional,
  IsArray,
  IsUrl,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'El campo no puede estar vacío' })
  @IsString()
  fullName: string;

  @IsNotEmpty({ message: 'El campo no puede estar vacío' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'El campo no puede estar vacío' })
  @IsString()
  phoneNumber: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.',
    },
  )
  password: string;

  @IsOptional()
  @IsString()
  profileBio: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  profileSkills: string[];

  @IsOptional()
  @IsUrl({}, { message: 'Debe ser una URL válida' })
  profileResume?: string;

  @IsOptional()
  @IsString()
  profileResumeOriginalName?: string;

  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @IsOptional()
  @IsString()
  role?: any;
}
