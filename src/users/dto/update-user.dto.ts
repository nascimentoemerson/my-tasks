import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password?: string;
}
