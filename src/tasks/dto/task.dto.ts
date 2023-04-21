import { IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  private _title: string;
  private _description?: string;
  private _completed: boolean;

  @IsNotEmpty()
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }

  get description(): string | undefined {
    return this._description;
  }
  set description(value: string | undefined) {
    this._description = value;
  }

  @IsBoolean()
  get completed(): boolean {
    return this._completed;
  }
  set completed(value: boolean) {
    this._completed = value;
  }
}
