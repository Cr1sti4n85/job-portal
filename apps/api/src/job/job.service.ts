import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JobService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(id: string, createJobDto: CreateJobDto) {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      companyId,
      position,
    } = createJobDto;
    const job = await this.prismaService.job.create({
      data: {
        title,
        description,
        requirements,
        position,
        salary,
        location,
        jobType,
        experienceLevel,
        companyId,
        createdBy: id,
      },
    });

    if (!job)
      return new BadRequestException('No se pudo crear el nuevo trabajo');

    return {
      message: 'Trabajo creado exitosamente',
      success: true,
      job,
    };
  }

  findAll() {
    return `This action returns all job`;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
