import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JobQuery } from 'src/types/job-query';
import type { Job } from 'src/types/job';

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

  async findAll(query: JobQuery) {
    const { keyword, location, jobType, salary } = query;

    let jobs: Job[] = [];

    const salaryRange = salary?.split('-');

    if (keyword || location || jobType || salary) {
      jobs = await this.prismaService.job.findMany({
        where: {
          ...(keyword && {
            OR: [
              { title: { contains: keyword, mode: 'insensitive' } },
              { description: { contains: keyword, mode: 'insensitive' } },
            ],
          }),

          ...(location && {
            location: { contains: location, mode: 'insensitive' },
          }),

          ...(jobType && {
            jobType: { contains: jobType, mode: 'insensitive' },
          }),

          ...(salary &&
            salaryRange?.length && {
              salary: {
                gte: parseInt(salaryRange[0], 10),
                lte: parseInt(salaryRange[1], 10),
              },
            }),
        },
        include: { company: true },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      jobs = await this.prismaService.job.findMany({
        skip: 0,
        take: 6,
        include: { company: true },
      });
    }

    if (!jobs || jobs.length === 0) {
      throw new NotFoundException('No se encontraron trabajos');
    }

    return {
      success: true,
      jobs,
    };
  }

  async findOne(jobId: string) {
    const job = await this.prismaService.job.findUnique({
      where: { id: jobId },
    });

    return {
      success: true,
      job,
    };
  }

  async findByUserId(userId: string) {
    const jobs = await this.prismaService.job.findMany({
      where: { createdBy: userId },
      include: { company: true },
      orderBy: { createdAt: 'desc' },
    });

    if (!jobs || jobs.length === 0) {
      throw new NotFoundException('No se encontraron trabajos de este usuario');
    }
    return {
      success: true,
      jobs,
    };
  }

  async addFavorite(userId: string, jobId: string) {
    const job = await this.prismaService.favorite.findFirst({
      where: { jobId, userId },
    });

    if (job) {
      throw new BadRequestException('Este trabajo ya está en favoritos');
    }

    const favoriteJob = await this.prismaService.favorite.create({
      data: { jobId, userId },
    });

    return {
      success: true,
      message: 'Trabajo agregado a favoritos',
      favoriteJob,
    };
  }

  async getFavorites(userId: string) {
    const favoriteJobs = await this.prismaService.favorite.findMany({
      where: { userId },
      include: { job: { include: { company: true } } },
    });
    if (!favoriteJobs || favoriteJobs.length === 0) {
      throw new NotFoundException('Tu lista de favoritos está vacía');
    }
    return {
      success: true,
      favoriteJobs,
    };
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
