import { Controller, Post, Body } from '@nestjs/common';
import { Public } from '../../auth/guards/jwt.guard';
import { CreateUserDto } from '../dto/create.dto';
import { CreateUserService } from '../services/create.service';

@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Public()
  @Post()
  async handle(@Body() createUserDto: CreateUserDto) {
    return await this.createUserService.handle(createUserDto);
  }
}
