import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationDto } from './create-application.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApplicationStatus } from 'src/types/application-status';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
  @IsNotEmpty()
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}
