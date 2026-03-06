import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async create(applicantId: string, jobId: string) {
    const existingApplication = await this.prisma.application.findFirst({
      where: { applicantId, jobId },
    });

    if (existingApplication) {
      throw new BadRequestException('Ya postulaste a este empleo');
    }

    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new BadRequestException('Empleo no encontrado');
    }

    const newApplication = await this.prisma.application.create({
      data: {
        applicantId,
        jobId,
      },
    });

    return {
      success: true,
      message: 'Tu postulación ha sido enviada exitosamente',
      application: newApplication,
    };
  }

  async getAppliedJobs(applicantId: string) {
    const applications = await this.prisma.application.findMany({
      where: { applicantId },
      orderBy: { createdAt: 'desc' },
      include: { job: { include: { company: true } } },
    });

    if (applications.length === 0) {
      throw new NotFoundException('No has postulado a ningún empleo aún');
    }

    return {
      success: true,
      applications,
    };
  }

  async getApplicants(jobId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: {
        applications: {
          orderBy: { createdAt: 'desc' },
          include: { applicant: true },
        },
      },
    });

    if (!job) {
      throw new NotFoundException('Empleo no encontrado');
    }

    return {
      success: true,
      job,
    };
  }

  async findOne(id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      throw new NotFoundException('Postulación no encontrada');
    }

    return application;
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    const { status } = updateApplicationDto;

    await this.findOne(id);

    const updatedApplication = await this.prisma.application.update({
      where: { id },
      data: { status },
    });

    return {
      success: true,
      message: 'Estado de la postulación actualizado exitosamente',
      application: updatedApplication,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
