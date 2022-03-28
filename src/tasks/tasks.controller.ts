/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { updateTaskStatusDto } from './dto/updateTaskStatus.dto';
//import { taskStatus } from './task-status-enum';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entities';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TaskController');

    constructor(private taskService: TasksService) { };

    @Get()
    getTask(@Query() filterDto: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
        //if we have any filter defined,call taskservice.getTasksWilFilters. otherwise just all task.
        this.logger.verbose(`User "${user.username}" retraving all tasks. retrying all tasks. filters: ${JSON.stringify(filterDto)}`);
        return this.taskService.getTasks(filterDto, user);
    }


    @Get("/:id")
    getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        return this.taskService.getTaskById(id, user);
    }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Task {
    //     return this.taskService.getTaskById(id);
    // }

    @Post()

    createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
        //console.log('title',title);
        //console.log('description',description);
        this.logger.verbose(`User ${user.username} create a task "${JSON.stringify(createTaskDto)}"`);
        return this.taskService.createTask(createTaskDto, user);
    }


    @Delete('/:id')
    deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.taskService.deleteTask(id, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: updateTaskStatusDto, @GetUser() user: User): Promise<Task> {
        const { status } = updateTaskStatusDto;
        return this.taskService.updateTaskStatus(id, status, user);
    }
}
