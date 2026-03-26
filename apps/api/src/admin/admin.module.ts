import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JobModule } from 'src/job/job.module';

@Module({
  imports: [PrismaModule, JobModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
