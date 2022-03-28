/* eslint-disable prettier/prettier */
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { taskStatus } from '../task-status-enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(taskStatus)
  status?: taskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
