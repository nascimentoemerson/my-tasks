import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDto {
  private _title: string;
  private _description?: string;
  private _completed?: boolean;

  @ApiProperty()
  @IsNotEmpty()
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }

  @ApiProperty()
  get description(): string | undefined {
    return this._description;
  }
  set description(value: string | undefined) {
    this._description = value;
  }
  
  @IsOptional()
  get completed(): boolean | undefined {
    return this._completed;
  }
  set completed(value: boolean | undefined) {
    this._completed = value;
  }
}
