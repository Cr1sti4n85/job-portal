import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/current-user.decorator';
import type { User } from 'src/types/current-user';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createCompany(
    @CurrentUser() user: User,
    @Body() createCompanyDto: CreateCompanyDto,
  ) {
    return this.companyService.create(user.id, createCompanyDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findCompanies(@CurrentUser() user: User) {
    return this.companyService.findCompanies(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findCompanyById(@Param('id') id: string) {
    return this.companyService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateCompany(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  removeCompany(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
