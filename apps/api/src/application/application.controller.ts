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
import { ApplicationService } from './application.service';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/current-user.decorator';
import type { User } from 'src/types/current-user';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  createJobApplication(@CurrentUser() user: User, @Param('id') jobId: string) {
    return this.applicationService.create(user.id, jobId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAppliedJobs(@CurrentUser() user: User) {
    return this.applicationService.getAppliedJobs(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getApplicants(@Param('id') jobId: string) {
    return this.applicationService.getApplicants(jobId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateStatus(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationService.update(id, updateApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationService.remove(+id);
  }
}
