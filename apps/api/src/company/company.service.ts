import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}
  async create(userId: string, createCompanyDto: CreateCompanyDto) {
    const { name, description, website, location, logo } = createCompanyDto;

    const existingCompany = await this.prisma.company.findUnique({
      where: { name },
    });

    if (existingCompany) {
      throw new BadRequestException('El nombre de esa empresa ya existe');
    }

    const company = await this.prisma.company.create({
      data: {
        name,
        description,
        website,
        location,
        logo,
        userId,
      },
    });

    return {
      message: 'Empresa creada exitosamente',
      succes: true,
      company,
    };
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
