import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksReminderService } from './tasks-reminder.service';

@Module({
  imports: [AuthModule],
  controllers: [TasksController],
  providers: [TasksService, TasksReminderService],
})
export class TasksModule {}