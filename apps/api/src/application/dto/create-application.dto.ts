import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsString()
  jobId: string;
}
