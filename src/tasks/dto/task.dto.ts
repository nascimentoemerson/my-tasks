import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  completed: boolean;

  description?: string;
}
