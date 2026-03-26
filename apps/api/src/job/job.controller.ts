import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/current-user.decorator';
import type { User } from 'src/types/current-user';
import type { JobQuery } from 'src/types/job-query';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createJob(@CurrentUser() user: User, @Body() createJobDto: CreateJobDto) {
    return this.jobService.create(user.id, createJobDto);
  }

  @Get()
  findAllJobs(@Query() query: JobQuery) {
    return this.jobService.findAll(query);
  }

  @Get(':id')
  findJobById(@Param('id') jobId: string) {
    return this.jobService.findOne(jobId);
  }

  @Post('favorites/:id')
  @UseGuards(JwtAuthGuard)
  addFavoriteJob(@CurrentUser() user: User, @Param('id') jobId: string) {
    return this.jobService.addFavorite(user.id, jobId);
  }

  @Get('favorites/all')
  @UseGuards(JwtAuthGuard)
  getFavoriteJobs(@CurrentUser() user: User) {
    return this.jobService.getFavorites(user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobService.remove(+id);
  }
}
