import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/current-user.decorator';
import type { User } from 'src/types/current-user';
import { JobService } from 'src/job/job.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly jobService: JobService) {}

  @Get('jobs')
  @UseGuards(JwtAuthGuard)
  getJobByUserId(@CurrentUser() user: User) {
    return this.jobService.findByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/jobs/:id')
  remove(@Param('id') id: string) {
    return this.jobService.remove(id);
  }
}
