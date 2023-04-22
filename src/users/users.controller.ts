import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './shared/user';
import { UsersService } from './shared/users.service';
import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todas os usuarios' })
  async getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Filtrar usuario por id' })
  async getById(@Param('id') id: string): Promise<User> {
    return this.usersService.getById(id);
  }

  @ApiBody({ type: UserDto })
  @Post()
  @ApiOperation({ summary: 'Criar um novo usuario' })
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @ApiBody({ type: UpdateUserDto })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um usuario' })
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.usersService.updateUser(id, user);
  }
}
