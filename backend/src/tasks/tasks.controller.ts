import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

type AuthRequest = Request & { user: { uid: string } };

@Controller('tasks')
@UseGuards(FirebaseAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Req() req: AuthRequest, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(req.user.uid, dto);
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.tasksService.findAll(req.user.uid);
  }

  @Get(':id')
  findOne(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.tasksService.findOne(req.user.uid, id);
  }

  @Patch(':id')
  update(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasksService.update(req.user.uid, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.tasksService.remove(req.user.uid, id);
  }

  @Post(':id/validate')
  @UseInterceptors(FileInterceptor('photo'))
  validate(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.tasksService.validate(req.user.uid, id, file);
  }
}